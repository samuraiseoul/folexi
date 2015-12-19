const MENU_CONTAINER_LINE_COLOR = 0x000000;
const MENU_CONTAINER_LINE_WIDTH = 2;
const START_MENU_WIDTH_PERCENTAGE = .66;
const START_MENU_HEIGHT_PERCENTAGE = .66;
const START_MENU_X_OFFSET_PERCENTAGE = .165;
const START_MENU_Y_OFFSET_PERCENTAGE = .165;
const START_MENU_OUTLINE_ROUNDNESS = 15;
const LANG_1_SELECT_X_OFFSET_PERCENTAGE = .0825;
const LANG_1_SELECT_Y_OFFSET_PERCENTAGE = .0825;
const LANG_1_SELECT_WIDTH_PERCENTAGE = .33;
const LANG_1_SELECT_HEIGHT_PERCENTAGE = .165;
const LANG_2_SELECT_X_OFFSET_PERCENTAGE = .5775;
const LANG_2_SELECT_Y_OFFSET_PERCENTAGE = .0825;
const LANG_2_SELECT_WIDTH_PERCENTAGE = .33;
const LANG_2_SELECT_HEIGHT_PERCENTAGE = .165;
const LEVEL_SELECT_X_OFFSET_PERCENTAGE = .33;
const LEVEL_SELECT_Y_OFFSET_PERCENTAGE = .33;
const LEVEL_SELECT_WIDTH_PERCENTAGE = .33;
const LEVEL_SELECT_HEIGHT_PERCENTAGE = .165;
const START_Y_OFFSET = .65;
const TUTORIAL_Y_OFFSET = .8;
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

function StartMenu(drawingStage, renderer, stateManager){
    this.drawingStage = drawingStage;
    this.renderer = renderer;
    this.stateManager = stateManager;
    
    this.initializeMenu();
};

StartMenu.prototype.calculateCoordsAndSize = function() {
    this.x = this.renderer.width * START_MENU_X_OFFSET_PERCENTAGE;
    this.y = this.renderer.height * START_MENU_Y_OFFSET_PERCENTAGE;
    this.width = this.renderer.width * START_MENU_WIDTH_PERCENTAGE;
    this.height = this.renderer.height * START_MENU_HEIGHT_PERCENTAGE; 
}

StartMenu.prototype.initializeContainer = function() {    
    this.container = new PIXI.Graphics();
    this.container.lineStyle(MENU_CONTAINER_LINE_WIDTH, MENU_CONTAINER_LINE_COLOR);
    this.container.drawRoundedRect(this.x, this.y, this.width, this.height, START_MENU_OUTLINE_ROUNDNESS);
    this.container.endFill();
}

StartMenu.prototype.initializeLang1Select = function() {    
    this.lang1Select = new Select(this.drawingStage, this.renderer, LANGUAGE_OPTIONS, this.container);
    this.lang1Select.initialize(
        (this.x + (this.width * LANG_1_SELECT_X_OFFSET_PERCENTAGE)),
        (this.y + (this.height * LANG_1_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LANG_1_SELECT_WIDTH_PERCENTAGE),
        (this.height * LANG_1_SELECT_HEIGHT_PERCENTAGE),
        'en'
    );
}

StartMenu.prototype.initializeLang2Select = function() {
    this.lang2Select = new Select(this.drawingStage, this.renderer, LANGUAGE_OPTIONS, this.container);
    this.lang2Select.initialize(
        (this.x + (this.width * LANG_2_SELECT_X_OFFSET_PERCENTAGE)),
        (this.y + (this.height * LANG_2_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LANG_2_SELECT_WIDTH_PERCENTAGE),
        (this.height * LANG_2_SELECT_HEIGHT_PERCENTAGE),
        'en'
    );
}

StartMenu.prototype.initializeLevelSelect = function() {
    this.levelSelect = new Select(this.drawingStage, this.renderer, LEVEL_OPTIONS, this.container);
    this.levelSelect.initialize(
        (this.x + ((this.width * LEVEL_SELECT_X_OFFSET_PERCENTAGE))),
        (this.y + (this.height * LEVEL_SELECT_Y_OFFSET_PERCENTAGE)),
        (this.width * LEVEL_SELECT_WIDTH_PERCENTAGE),
        (this.height * LEVEL_SELECT_HEIGHT_PERCENTAGE),
        '1'
    );
}

StartMenu.prototype.initializeStart = function() {
    //have to use cocoontext Pixi plugin for clickable text
    this.start = new PIXI.cocoontext.CocoonText("START", {font: "bold 4em Ariel Black, sans-serif"});
    this.start.x = (this.x + (this.width / 2) - (this.start.getBounds()['width'] / 2));
    this.start.y = (this.y + (this.container.height * START_Y_OFFSET) - (this.start.getBounds()['height'] / 2));
    //cocoon text doesn't know of this object so give it a reference
    this.start.parentState = this;
    this.start.interactive = true;
    this.start.click = function() {
        this.parentState.stateManager.lang1 = this.parentState.lang1Select.value;
        this.parentState.stateManager.lang2 = this.parentState.lang2Select.value;
        this.parentState.stateManager.wordLevel = this.parentState.levelSelect.value;
        this.parentState.stateManager.state = INITIALIZE;
    }
}

StartMenu.prototype.initializeTutorial = function() {
    this.tutorial = new PIXI.cocoontext.CocoonText("TUTORIAL", {font: "bold 4em Ariel Black, sans-serif"});
    this.tutorial.x = (this.x + (this.width / 2) - (this.tutorial.getBounds()['width'] / 2));
    this.tutorial.y = (this.y + (this.container.height * TUTORIAL_Y_OFFSET) - (this.tutorial.getBounds()['height'] / 2));
    this.tutorial.interactive = true;
    this.tutorial.click = function(ev) {
        console.log(ev);
    }
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
    if(this.levelSelect.menuOpened) {
        this.hide();
        this.levelSelect.draw();
        this.renderer.render(this.drawingStage);
        return;
    }
    if(this.lang1Select.menuOpened) {
        this.hide();
        this.lang1Select.draw();
        this.renderer.render(this.drawingStage);
        return;
    }
    if(this.lang2Select.menuOpened) {
        this.hide();
        this.lang2Select.draw();
        this.renderer.render(this.drawingStage);
        return;
    }
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