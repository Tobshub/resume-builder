type SectionTheme = {
  color?: string;
  background?: string;
  highlights?: string;
  start: {
    y: number;
    x: number;
  };
  flexStyle: "column" | "row" | "row-reverse" | "column-reverse";
  font?: {
    large: string;
    small: string;
  };
  width?: number | string;
  height?: number | string;
};

const themes: {
  [key: string]: {
    general: SectionTheme;
    header: SectionTheme;
    body: SectionTheme;
  };
} = {
  default: {
    general: {
      background: "#ffffff",
      highlights: "goldenrod",
      start: {
        y: 10,
        x: 10,
      },
      flexStyle: "column",
    },
    header: {
      flexStyle: "row",
      background: "#aaaaaa",
      color: "#ffffff",
      highlights: "#000000",
      font: {
        large: ".75rem",
        small: ".5rem",
      },
      start: {
        x: 0,
        y: 0,
      },
    },
    body: {
      flexStyle: "row",
      color: "#000000",
      highlights: "gold",
      font: {
        large: ".7rem",
        small: ".35rem",
      },
      start: {
        y: 0,
        x: 0,
      },
    },
  },
  clean: {
    general: {
      background: "#ffffff",
      highlights: "goldenrod",
      start: {
        y: 10,
        x: 10,
      },
      flexStyle: "column",
    },
    header: {
      flexStyle: "row",
      background: "#aaaaaa",
      color: "#ffffff",
      highlights: "#000000",
      font: {
        large: ".75rem",
        small: ".5rem",
      },
      start: {
        x: 0,
        y: 0,
      },
    },
    body: {
      flexStyle: "row",
      color: "#000000",
      font: {
        large: ".7rem",
        small: ".35rem",
      },
      start: {
        y: 0,
        x: 0,
      },
    },
  },
};

export default themes;
