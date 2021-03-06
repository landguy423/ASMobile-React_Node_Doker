import SectionToSelector from '../helpers/ElementNameToSelector';

/**
 * Check if the given element is (not) visible
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 * @param  {Function} done      Function to execute when finished
 */
module.exports = (element, falseCase, done) => {
    /**
     * Visible state of the give element
     * @type {String}
     */
    if(!device){
    const isVisible = browser.isVisible(SectionToSelector(element));

    if (falseCase) {
        expect(isVisible).to.not
            .equal(true, `Expected element "${element}" not to be visible`);
    } else {
        expect(isVisible).to
            .equal(true, `Expected element "${element}" to be visible`);
    }

    done();
   }
   if(device){
     browser.elementByXPath(SectionToSelector(element))
       .then((el) => {
         el.isDisplayed().then((isVisible) => { 
           if (falseCase) {
             console.log("element visible false case fired");
             expect(isVisible).to.not
             .equal(true, `Expected element "${element}" not to be displayed`);
           done();
         } else {
           console.log("element visible true case found");
           expect(isVisible).to
             .equal(true, `Expected element "${element}" not to be displayed`);
             done();
         }
         })
         .catch((e) => { 
           expect(isVisible).to
             .equal(true, `Expected element "${element}" not to be displayed`);
             done();
         })
       });
      
    };
   
};
