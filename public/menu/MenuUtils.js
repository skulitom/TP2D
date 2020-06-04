class MenuUtils {
    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(buttonWidth, buttonHeight);
            btn.position(resolution[0]/2-buttonWidth/2, menuLoc[1] + 100*position);
            btn.style("font-family", "Bodoni");
            btn.style("font-size", buttonFontSize+"px");
        }
        return btn;
    };

    removeButton = (btn) => {
        if(btn) {
            btn.remove();
            btn = null;
        }
        return btn;
    };
}