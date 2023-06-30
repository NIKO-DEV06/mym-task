declare const require: any;
declare const app: any;
declare const Color: any;
declare const Group: any;
declare const Path: any;
declare const Rectangle: any;
declare const TextFrame: any;

import * as React from "react";

interface Theme {
  colors: string[];
  style: string;
}

const designStyles = ["Vintage", "Futuristic", "Minimalistic", "Bold"];

const App: React.FC = () => {
  const [colorPalette, setColorPalette] = React.useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = React.useState<string>("");
  const [savedThemes, setSavedThemes] = React.useState<Theme[]>([]);

  const generateRandomPalette = () => {
    const colors = Array.from({ length: 5 }, () => generateRandomColor());
    setColorPalette(colors);
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateRandomStyle = () => {
    const randomStyle =
      designStyles[Math.floor(Math.random() * designStyles.length)];
    setSelectedStyle(randomStyle);
  };

  const saveTheme = () => {
    const newTheme: Theme = {
      colors: colorPalette,
      style: selectedStyle,
    };
    setSavedThemes([...savedThemes, newTheme]);
  };

  const createColorRectangle = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) => {
    const rect = new Rectangle();
    rect.fillColor = new Color(color);
    rect.width = width;
    rect.height = height;
    rect.position = [x, y];
    return rect;
  };

  // const createTextFrame = (
  //   x: number,
  //   y: number,
  //   text: string,
  //   color: string
  // ) => {
  //   const frame = new TextFrame();
  //   frame.textRange.contents = text;
  //   frame.fillColor = new Color(color);
  //   frame.position = [x, y];
  //   return frame;
  // };

  const createStyleGroup = (elements: any[]) => {
    const group = new Group();
    elements.forEach((element) => {
      group.addChild(element);
    });
    return group;
  };

  const applyPalette = () => {
    const artboard = app.activeDocument.artboards[0];
    const x = artboard.artboardRect[0] + 100;
    const y = artboard.artboardRect[1] + 100;
    const width = 50;
    const height = 50;

    const elements = colorPalette.map((color, index) => {
      return createColorRectangle(x + index * 60, y, width, height, color);
    });

    createStyleGroup(elements);
  };

  React.useEffect(() => {
    applyPalette();
  }, [colorPalette]);

  return (
    <div className="app">
      <h1>Random Theme Generator</h1>
      <div className="palette">
        {colorPalette.map((color, index) => (
          <div className="color" key={index} style={{ backgroundColor: color }}>
            {color}
          </div>
        ))}
      </div>
      <button disabled={selectedStyle === ""} onClick={generateRandomPalette}>
        Generate Color Palette
      </button>
      <button onClick={generateRandomStyle}>Generate Design Style</button>
      {selectedStyle && <p>Selected Style: {selectedStyle}</p>}
      <button
        disabled={selectedStyle === "" || colorPalette.length === 0}
        onClick={saveTheme}
      >
        Save Theme
      </button>
      <h2>Saved Themes</h2>
      <ul>
        {savedThemes.map((theme, index) => (
          <li key={index}>
            <div className="palette">
              {theme.colors.map((color, index) => (
                <div
                  className="color"
                  key={index}
                  style={{ backgroundColor: color }}
                >
                  {color}
                </div>
              ))}
            </div>
            <p>Style: {theme.style}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
