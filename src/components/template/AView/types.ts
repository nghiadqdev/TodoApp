import { ColorValue, ViewStyle } from "react-native";

export interface AViewType {
    /**
     * when true style flex = 1
     * @default false
    */
    f1?: boolean,
    /**
     * when true style flex = 1
     * @default false
    */
    f2?: boolean,
    /**
     * when true style justicalContant: 'center', alineItem: 'center'
     * @default false
    */
    center?: boolean,
    /**
    * width of view
    * @default false
   */
    w?: number,
    /**
    * height of view
    * @default false
   */
    h?: number,
    /**
    * background value
    * @default transparent
   */
    bg?: ColorValue,
    /**
    * padding value
    * @default 0
   */
    p?: number, // padding
    /**
    * padding vertical value
    * @default 0
   */
    pv?: number
    /**
    * padding horizontal value
    * @default 0
   */
    ph?: number
    /**
    * padding left value
    * @default 0
   */
    pl?: number
    /**
    * padding right value
    * @default 0
   */
    pr?: number
    /**
    * padding top value
    * @default 0
   */
    pt?: number
    /**
    * padding bottom value
    * @default 0
   */
    pb?: number
    /**
    * flexdirection row
    * @default false
   */
    r?: number
    /**
    * view style
    * @default false
   */
    aStyle?: ViewStyle | ViewStyle[]
}
