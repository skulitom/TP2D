class MenuUtils {
    calculatePosition = (position) => {
        return [resolution[0]/2-buttonWidth/2, menuLoc[1] + 100*position];
    };

    createDropdown = (sel, items, selectedPos, selectEvent, position) => {
        if(!sel) {
            sel = createSelect();
            sel.position(...this.calculatePosition(position));
            items.forEach(item => {
                sel.option(item);
            });
            sel.size(buttonWidth, buttonHeight);
            sel.style("font-family", "Bodoni");
            sel.style("font-size", buttonFontSize+"px");
            sel.selected(items[selectedPos]);
            sel.changed(selectEvent);
        }
        return sel;
    };

    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(buttonWidth, buttonHeight);
            btn.position(...this.calculatePosition(position));
            btn.style("font-family", "Bodoni");
            btn.style("font-size", buttonFontSize+"px");
        }
        return btn;
    };

    removeItem = (item) => {
        if(item) {
            item.remove();
            item = null;
        }
        return item;
    };
}