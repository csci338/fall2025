class Debugger {
    constructor(selector, levels) {
        this.selector = selector;
        this.levels = levels;
        this.initStyles();
        this.addLabels();
        window.addEventListener('resize', this.addLabels.bind(this));
        window.setTimeout(this.addLabels.bind(this), 1000);
        window.setInterval(this.addLabels.bind(this), 5000);
    }

    initStyles() {
        this.styleTag = document.createElement("style");
        document.head.insertAdjacentElement('beforeend', this.styleTag);
        const highlightClass = `
        .__boxHighlight {
            background-color: rgba(255, 27, 27, 0.1);
            padding: 10px;
            margin: 20px;
            border: solid 5px rgba(255, 27, 27, 0.3);
            padding-top: 40px;
        }`;
        this.styleTag.insertAdjacentHTML('beforeend', highlightClass);
    }

    addClassToDOM(elem, idx) {
        const className = `__label_${idx}`;
        const excludedClasses = [className, '__boxHighlight'];
        
        // determine what the label should be:
        let label = '';
        label = elem.id ? `#${elem.id}` : '';
        if (label == '' && 
            elem.classList.length > 0 && 
            !excludedClasses.includes(elem.classList[0])) {
                label = `.${elem.classList[0]}`;
        }
        if (label == '') {
           label = `${elem.tagName.toLowerCase()}`;
        }
        
        // build the class:
        const rect = elem.getBoundingClientRect();
        const top = rect.top + window.scrollY; 
        const left = rect.left + window.scrollX; 
        const cssTemplateString = `.${className}::after{
           content: '${label}';font-weight: bold;
           background-color: black !important;
           display: inline-block;
           position: absolute;
           padding: 5px !important;
           color: white;
           font-size: 10pt;
           top: ${top}px;
           left: ${left}px;
           font-family: 'Arial';
        }`;
        this.styleTag.insertAdjacentHTML('beforeend', cssTemplateString);
    }

    applyClassToElement(elem, idx) {
        const className = `__label_${idx}`;
        elem.classList.add('__boxHighlight');
        elem.classList.add(className);
    }

    addLabels() {
        const allSelectors = this.buildSelector(this.selector, this.levels);
        const elements = document.querySelectorAll(allSelectors);
        // console.log(elements);
        elements.forEach(this.addClassToDOM.bind(this));
        elements.forEach(this.applyClassToElement.bind(this));
    }
     
    buildSelector(selector, levels) {
        const selectors = [];
        selectors.push(selector);
        for (let i = 1; i < levels; i++) {
           let s = selector;
           let j = i; 
        //    console.log(selectors);
           while (j > 0) {
              s += ' > *';
              j--;
           }
           selectors.push(s);
        }
        // console.log(selectors.join(', '));
        return selectors.join(', ')
    }
}

// convenience function:
const debug = (selector, levels) => {
    new Debugger(selector, levels);
};

