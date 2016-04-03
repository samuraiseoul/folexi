const MENU_CONTAINER_LINE_COLOR = 'black';
const MENU_CONTAINER_LINE_WIDTH = 2;
const START_MENU_WIDTH_PERCENTAGE = .66;
const START_MENU_HEIGHT_PERCENTAGE = .66;
const START_MENU_Y_OFFSET_PERCENTAGE = .165;
const START_MENU_OUTLINE_ROUNDNESS = 15;
const LANG_1_SELECT_X_OFFSET_PERCENTAGE = .25;
const LANG_1_SELECT_Y_OFFSET_PERCENTAGE = .3;
const LANG_1_SELECT_WIDTH_PERCENTAGE = .33;
const LANG_1_SELECT_HEIGHT_PERCENTAGE = .165;
const LANG_2_SELECT_X_OFFSET_PERCENTAGE = .25;
const LANG_2_SELECT_Y_OFFSET_PERCENTAGE = .3;
const LANG_2_SELECT_WIDTH_PERCENTAGE = .33;
const LANG_2_SELECT_HEIGHT_PERCENTAGE = .165;
const LEVEL_SELECT_WIDTH_PERCENTAGE = .33;
const LEVEL_SELECT_HEIGHT_PERCENTAGE = .165;
const LEVEL_SELECT_Y_OFFSET_PERCENTAGE = .1;
const START_Y_OFFSET = .1;
const TUTORIAL_Y_OFFSET = .3;
const LANGUAGE_OPTIONS = {
        'en' : 'English',
        'ko' : 'Korean',
        'jp' : 'Japanese',
        'zh' : 'Chinese',
        'es' : 'Spanish',
        'fr' : 'French',
        'de' : 'German',
        'ar' : 'Arabic',
        'hi' : 'Hindi',
        'ne' : 'Nepali'
    };
const LEVEL_OPTIONS = {
        '1' : 'One',
        '2' : 'Two',
        '3' : 'Three',
        '4' : 'Four',
        '5' : 'Five',
        '6' : 'Six'
    };

function StartMenu(canvas, stateManager){
    this.canvas = canvas;
    this.stateManager = stateManager;
    
    this.initializeMenu();
};

StartMenu.prototype.calculateCoordsAndSize = function() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.width = this.canvas.width * START_MENU_WIDTH_PERCENTAGE;
    this.height = this.canvas.height * START_MENU_HEIGHT_PERCENTAGE; 
}

StartMenu.prototype.initializeContainer = function() {
    this.container = new fabric.Rect({
                  left: this.x,
                  top: this.y,
                  width: this.width,
                  height: this.height,
                  rx: START_MENU_OUTLINE_ROUNDNESS,
                  ry: START_MENU_OUTLINE_ROUNDNESS,
                  fill: 'white',
                  strokeWidth: MENU_CONTAINER_LINE_WIDTH,
                  stroke: MENU_CONTAINER_LINE_COLOR,
                });
    this.container.set(DEFAULT);
}

StartMenu.prototype.initializeLang1Select = function() {    
    this.lang1Select = new Select(this.canvas, LANGUAGE_OPTIONS, this.container, this.stateManager);
    this.lang1Select.initialize(
        (this.x - (this.width * LANG_1_SELECT_X_OFFSET_PERCENTAGE)),
        (this.y - (this.height * LANG_1_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LANG_1_SELECT_WIDTH_PERCENTAGE),
        (this.height * LANG_1_SELECT_HEIGHT_PERCENTAGE),
        'en'
    );
}

StartMenu.prototype.initializeLang2Select = function() {
    this.lang2Select = new Select(this.canvas, LANGUAGE_OPTIONS, this.container, this.stateManager);
    this.lang2Select.initialize(
        (this.x + (this.width * LANG_2_SELECT_X_OFFSET_PERCENTAGE)),
        (this.y - (this.height * LANG_2_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LANG_2_SELECT_WIDTH_PERCENTAGE),
        (this.height * LANG_2_SELECT_HEIGHT_PERCENTAGE),
        'en'
    );
}

StartMenu.prototype.initializeLevelSelect = function() {
    this.levelSelect = new Select(this.canvas, LEVEL_OPTIONS, this.container, this.stateManager);
    this.levelSelect.initialize(
        this.x,
        (this.y - (this.height * LEVEL_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LEVEL_SELECT_WIDTH_PERCENTAGE),
        (this.height * LEVEL_SELECT_HEIGHT_PERCENTAGE),
        '1'
    );
}

StartMenu.prototype.initializeStart = function() {
    this.start = new fabric.Text("START", {
        left: this.x,
        top: (this.y + (this.container.height * START_Y_OFFSET)),
        fontSize: '64',
        parentContext: this
    });
    this.start.set(DEFAULT);
    this.start.set(FONT_STYLE);
    this.start.set(INTERACTABLE);
    
    //May need to give this.start, a pointer to this object
    this.start.on("selected", function(){
        this.parentContext.stateManager.lang1 = this.parentContext.lang1Select.value;
        this.parentContext.stateManager.lang2 = this.parentContext.lang2Select.value;
        this.parentContext.stateManager.wordLevel = this.parentContext.levelSelect.value;
        this.parentContext.stateManager.state = INITIALIZE;
    });
}

StartMenu.prototype.initializeTutorial = function() {
    this.tutorial = new fabric.Text("TUTORIAL", {
        left: this.x,
        top: (this.y + (this.container.height * TUTORIAL_Y_OFFSET)),
        fontSize: '64',
        parentContext: this
    });
    this.tutorial.set(DEFAULT);
    this.tutorial.set(INTERACTABLE);
    this.tutorial.set(FONT_STYLE);
    
    this.tutorial.on("selected", function(){
        console.log("Tutorial clicked");
    });
}

StartMenu.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeStart();
    this.initializeTutorial();
    this.initializeLang1Select();
    this.initializeLang2Select();
    this.initializeLevelSelect();
};

StartMenu.prototype.draw = function() {
    this.canvas.removeAll();
    this.canvas.add(this.container);
    this.canvas.add(this.start);
    this.canvas.add(this.tutorial);
    this.levelSelect.addAllToCanvas();
    this.lang1Select.addAllToCanvas();
    this.lang2Select.addAllToCanvas();
    this.levelSelect.addAllToCanvas();
};