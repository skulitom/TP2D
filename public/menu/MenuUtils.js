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
            sel.style("font-family", FONT_FAMILY_TP2D);
            sel.style("font-size", buttonFontSize+"px");
            sel.selected(items[selectedPos]);
            sel.changed(selectEvent);
        }
        return sel;
    };

    createCheckbox = (chk, name, chkFunction, status, position) => {
        if(!chk) {
            chk = createCheckbox(name, status);
            chk.changed(chkFunction);
            chk.position(...this.calculatePosition(position));
            chk.style("font-family", FONT_FAMILY_TP2D);
            chk.style("font-size", buttonFontSize+"px");
            chk.size(buttonWidth, buttonHeight);
        }
        return chk;
    };

    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(buttonWidth, buttonHeight);
            btn.position(...this.calculatePosition(position));
            btn.style("font-family", FONT_FAMILY_TP2D);
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