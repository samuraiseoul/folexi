const MENU_CONTAINER_LINE_COLOR = 0x000000;
const MENU_CONTAINER_LINE_WIDTH = 2;
const LANGUAGE_OPTIONS = {
        'en' : 'English',
        'ko' : 'Korean',
        'jp' : 'Japanese',
        'zh' : 'Chinese',
        'es' : 'Spanish',
        'fr' : 'French',
        'de' : 'German',
        'ar' : 'Arabic'
    };

function StartMenu(drawingStage, renderer, stateManager){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.stateManager = stateManager;
    
    this.initializeMenu();
};

StartMenu.prototype.calculateCoordsAndSize = function() {
    this.x = this.renderer.width / 6;
    this.y = this.renderer.height / 6;
    this.width = this.renderer.width * .66;
    this.height = this.renderer.height * .66; 
}

StartMenu.prototype.initializeContainer = function() {    
    this.container = new PIXI.Graphics();
    this.container.lineStyle(MENU_CONTAINER_LINE_WIDTH, MENU_CONTAINER_LINE_COLOR);
    this.container.drawRoundedRect(this.x, this.y, this.width, this.height, 15);
    this.container.endFill();
    this.drawingStage.addChild(this.container);
}

StartMenu.prototype.initializeLang1Select = function() {    
    this.lang1Select = new Select(this.drawingStage, this.renderer, LANGUAGE_OPTIONS);
    this.lang1Select.initialize(
        (this.x + (this.width / 12)),
        (this.y + (this.height / 12)),
        (this.width / 3),
        (this.height / 6),
        'en'
    );
}

StartMenu.prototype.initializeLang2Select = function() {
    this.lang2Select = new Select(this.drawingStage, this.renderer, LANGUAGE_OPTIONS);
    this.lang2Select.initialize(
        (this.x + ((this.width / 12) * 7)),
        (this.y + (this.height / 12)),
        (this.width / 3),
        (this.height / 6),
        'en'
    );
}

StartMenu.prototype.initializeLevelSelect = function() {
    this.levelSelect = new Select(this.drawingStage, this.renderer, {
        '1' : 'One',
        '2' : 'Two',
        '3' : 'Three',
        '4' : 'Four',
        '5' : 'Five',
        '6' : 'Six'
    });
    this.levelSelect.initialize(
        (this.x + ((this.width / 3))),
        (this.y + (this.height / 3)),
        (this.width / 3),
        (this.height / 6),
        '1'
    );
}

StartMenu.prototype.initializeStart = function() {
    //have to use cocoontext Pixi plugin for clickable text
    this.start = new PIXI.cocoontext.CocoonText("START", {font: "bold 4em Ariel Black, sans-serif"});
    this.start.x = (this.x + (this.width / 2) - (this.start.getBounds()['width'] / 2));
    this.start.y = (this.y + (this.container.height * .65) - (this.start.getBounds()['height'] / 2));
    this.start.parentState = this;
    this.start.interactive = true;
    this.start.click = function() {
        //cocoon text doesn't know of this object so give it a reference
        this.parentState.stateManager.state = INITIALIZE;
    }
}

StartMenu.prototype.initializeTutorial = function() {
    this.tutorial = new PIXI.cocoontext.CocoonText("TUTORIAL", {font: "bold 4em Ariel Black, sans-serif"});
    this.tutorial.x = (this.x + (this.width / 2) - (this.tutorial.getBounds()['width'] / 2));
    this.tutorial.y = (this.y + (this.container.height * .8) - (this.tutorial.getBounds()['height'] / 2));
    this.tutorial.interactive = true;
    this.tutorial.click = function(ev) {
        console.log(ev);
    }
}

StartMenu.prototype.initializeMenu = function() {
    this.calculateCoordsAndSize();
    this.initializeContainer();
    this.initializeLang1Select();
    this.initializeLang2Select();
    this.initializeLevelSelect();
    this.initializeStart();
    this.initializeTutorial();
};

StartMenu.prototype.draw = function() {
    this.drawingStage.addChild(this.container);
    this.lang1Select.draw();
    this.lang2Select.draw();
    this.levelSelect.draw();
    this.drawingStage.addChild(this.start);
    this.drawingStage.addChild(this.tutorial);
    this.renderer.render(this.drawingStage);
};

StartMenu.prototype.hide = function() {
    this.drawingStage.removeChild(this.start);
    this.drawingStage.removeChild(this.tutorial);
    this.drawingStage.removeChild(this.container);
    this.lang1Select.hide();
    this.lang2Select.hide();
    this.levelSelect.hide();
}