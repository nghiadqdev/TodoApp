import { ColorValue, TextStyle, ViewStyle } from "react-native";

export interface ATextType {
    /**
     * when true style of text is size=30 bold 
     * @default false
    */
    title?: boolean,
    /**
     * when true style fontSize=10
     * @default false
    */
    h10?: boolean,
    /**
     * when true style fontSize=11
     * @default false
    */
    h11?: boolean,
    /**
     * when true style fontSize=12
     * @default false
    */
    h12?: boolean,
    /**
     * when true style fontSize=14
     * @default false
    */
    h14?: boolean,
    /**
     * when true style fontSize=16
     * @default false
    */
    h16?: boolean,
    /**
     * when true style fontSize=18
     * @default false
    */
    h18?: boolean,
    /**
     * when true style fontSize=20
     * @default false
    */
    h20?: boolean,
    /**
     * when true style fontSize=22
     * @default false
    */
    h22?: boolean,
    /**
     * when true style fontSize=24
     * @default false
    */
    h24?: boolean,
    /**
     * when true style fontSize=26
     * @default false
    */
    h26?: boolean,
    /**
     * when true style fontSize=28
     * @default false
    */
    h28?: boolean,
    /**
     * when true style fontSize=30
     * @default false
    */
    h30?: boolean,
    /**
     * set color of text
     * @default false
    */
    color?: string,
    /**
     * when true style fontWeight=400
     * @default false
    */
    w400?: boolean,
    /**
     * when true style fontWeight=500
     * @default false
    */
    w500?: boolean,
    /**
     * when true style fontWeight=600
     * @default false
    */
    w600?: boolean,
    /**
     * when true style fontWeight=700
     * @default false
    */
    w700?: boolean,
    /**
     * when true style fontWeight=900
     * @default false
    */
    w900?: boolean,
    /**
     * when true style fontFamily=heavy
     * @default false
    */
    font_Heavy?: boolean,
    /**
     * when true style fontFamily=bold
     * @default false
    */
    font_Bold?: boolean,
    /**
     * when true style textAline=center
     * @default false
    */
    center?: boolean,
    /**
     * set number line text
     * @default false
    */
    numOfLines?: number,
    /**
     * when lineheight of text
     * @default false
    */
    lineH?: number,
    /**
    * view style
    * @default false
   */
    aStyle?: TextStyle | TextStyle[]
}
