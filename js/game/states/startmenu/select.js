const SELECT_LINE_COLOR = 'black';
const SELECT_LINE_WIDTH = 2;
const SELECT_CORNER_ROUNDNESS = 10;
const SELECT_MENU_FILL_COLOR = 'white';

function Select(canvas, options, parentContainer, stateManager) {
    this.canvas = canvas;
    this.options = options;
    this.setOptionsSize();
    this.parentContainer = parentContainer;
    this.menuOpened = false;
    this.stateManager = stateManager;
    
    this.value = "";
}

Select.prototype.intializeContainer = function(x, y, width, height) {
    this.container = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        rx: SELECT_CORNER_ROUNDNESS,
        ry: SELECT_CORNER_ROUNDNESS,
        fill: 'white',
        strokeWidth: SELECT_LINE_WIDTH,
        stroke: SELECT_LINE_COLOR,
        parentContext: this
    });
    this.container.set(DEFAULT);
    this.container.set(INTERACTABLE);
    
    this.container.on('selected', function(ev) {
        this.parentContext.stateManager.menuOpened = true;
        this.parentContext.openMenu();
    });
}

Select.prototype.initializeText = function(x, y, width, height, startingOption) {
    this.text = new fabric.Text(this.options[startingOption], {
        left: x,
        top: y,
        parentContext: this,
        fontSize: '40'
    });
    this.text.set(DEFAULT);
    this.text.set(INTERACTABLE);
    this.text.set(FONT_STYLE);
    
    this.text.on('selected', function(ev) {
        this.parentContext.stateManager.menuOpened = true;
        this.parentContext.openMenu();
    });
}

Select.prototype.initializeSelectMenu = function() {
    this.selectMenu = new fabric.Rect({
        left: this.parentContainer.getLeft(),
        top: this.parentContainer.getTop(),
        width: this.parentContainer.getWidth(),
        height: this.parentContainer.getHeight(),
        rx: SELECT_CORNER_ROUNDNESS,
        ry: SELECT_CORNER_ROUNDNESS,
        fill: 'white',
        strokeWidth: SELECT_LINE_WIDTH,
        stroke: SELECT_LINE_COLOR
    });
    this.selectMenu.set(DEFAULT);
}

Select.prototype.setOptionsSize = function() {
    this.optionsSize = 0;
    for(var k in this.options) {
        this.optionsSize++;
    }
}

Select.prototype.initializeOptionTexts = function() {
    this.optionTexts = [];
    var i = 0;
    var selectMenuWidth = this.selectMenu.getWidth();
    var selectMenuHeight = this.selectMenu.getHeight();
    var selectMenuX = this.selectMenu.getLeft();
    var selectMenuY = this.selectMenu.getTop();
    for(var key in this.options) {
        var tmp = new fabric.Text(this.options[key], {
            left: ((selectMenuWidth * ((i < (this.optionsSize / 2)) ? -0.25 : .25)) + selectMenuX),
            top: (((((i < (this.optionsSize / 2)) ? i : (i - (this.optionsSize / 2))) + 1) * (selectMenuHeight / (this.optionsSize / 2))) 
            - (selectMenuHeight / (this.optionsSize)) + selectMenuY) - (selectMenuHeight / 2),
            fontSize: '40',
            parentContext: this,
            optionValue: key
        });
        tmp.set(DEFAULT);
        tmp.set(INTERACTABLE);
        tmp.set(FONT_STYLE);
        tmp.on('selected', function() {
            this.parentContext.value = this.optionValue;
            this.parentContext.updateSelectText();
            this.parentContext.stateManager.menuOpened = false;
            this.parentContext.menuOpened = false;
        });
        this.optionTexts.push(tmp);
        i++;
    }
}

Select.prototype.initialize = function(x, y, width, height, startingOption) {
    this.intializeContainer(x, y, width, height);
    this.initializeText(x, y, width, height, startingOption);
    this.value = startingOption;
    this.initializeSelectMenu();
    this.initializeOptionTexts();
}

Select.prototype.updateSelectText = function() {    
    this.text.set({text: this.options[this.value]});
}

Select.prototype.openMenu = function() {
    this.menuOpened = true;
}

Select.prototype.addAllToCanvas = function() {
    if(this.menuOpened) {
        this.canvas.add(this.selectMenu);
        for(var i = 0; i < this.optionTexts.length; i++) {
            this.canvas.add(this.optionTexts[i]);
        }
    } else if(!this.stateManager.menuOpened){
        this.canvas.add(this.container);
        this.canvas.add(this.text);
    }
}