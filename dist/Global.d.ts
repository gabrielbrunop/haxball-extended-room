export declare enum Teams {
    Spectators = 0,
    Red = 1,
    Blue = 2
}
export declare enum Stadiums {
    Classic = "Classic",
    Easy = "Easy",
    Small = "Small",
    Big = "Big",
    Rounded = "Rounded",
    Hockey = "Hockey",
    BigHockey = "BigHockey",
    BigEasy = "BigEasy",
    BigRounded = "BigRounded",
    Huge = "Huge"
}
export declare enum ChatSounds {
    None = 0,
    Normal = 1,
    Notification = 2
}
export declare enum ChatStyle {
    Normal = "normal",
    Bold = "bold",
    Italic = "italic",
    Small = "small",
    SmallBold = "small-bold",
    SmallItalic = "small-italic"
}
export declare enum Colors {
    AliceBlue = 15792383,
    AntiqueWhite = 16444375,
    Aqua = 65535,
    AquaMarine = 8388564,
    Azure = 15794175,
    Beige = 16119260,
    Bisque = 16770244,
    Black = 0,
    BlancheDalmond = 16772045,
    Blue = 255,
    BlueViolet = 9055202,
    Brown = 10824234,
    Burlywood = 14596231,
    CadetBlue = 6266528,
    Chartreuse = 8388352,
    Chocolate = 13789470,
    Coral = 16744272,
    CornflowerBlue = 6591981,
    Cornsilk = 16775388,
    Crimson = 14423100,
    Cyan = 65535,
    DarkBlue = 139,
    DarkCyan = 35723,
    DarkGoldenRod = 12092939,
    DarkGray = 11119017,
    DarkGreen = 25600,
    DarkKhaki = 12433259,
    DarkMagenta = 9109643,
    DarkOliveGreen = 5597999,
    DarkOrange = 16747520,
    DarkOrchid = 10040012,
    DarkRed = 9109504,
    DarkSalmon = 15308410,
    DarkseaGreen = 9419919,
    DarkSlateBlue = 4734347,
    DarkSlateGray = 3100495,
    DarkTurquoise = 52945,
    DarkViolet = 9699539,
    DeepPink = 16716947,
    DeepSkyBlue = 49151,
    DimGray = 6908265,
    DodgerBlue = 2003199,
    Firebrick = 11674146,
    FloralWhite = 16775920,
    ForestGreen = 2263842,
    Fuchsia = 16711935,
    Gainsboro = 14474460,
    GhostWhite = 16316671,
    Gold = 16766720,
    GoldenRod = 14329120,
    Gray = 8421504,
    Green = 32768,
    GreenYellow = 11403055,
    Honeydew = 15794160,
    HotPink = 16738740,
    IndianRed = 13458524,
    Indigo = 4915330,
    Ivory = 16777200,
    Khaki = 15787660,
    Lavender = 15132410,
    Lavenderblush = 16773365,
    LawnGreen = 8190976,
    LemonChiffon = 16775885,
    LightBlue = 11393254,
    Lightcoral = 15761536,
    LightCyan = 14745599,
    LightGoldenRodYellow = 16448210,
    LightGrey = 13882323,
    LightGreen = 9498256,
    LightPink = 16758465,
    LightSalmon = 16752762,
    LightSeaGreen = 2142890,
    LightSkyBlue = 8900346,
    LightSlateGray = 7833753,
    LightSteelBlue = 11584734,
    LightYellow = 16777184,
    Lime = 65280,
    LimeGreen = 3329330,
    Linen = 16445670,
    Magenta = 16711935,
    Maroon = 8388608,
    MediumAquamarine = 6737322,
    MediumBlue = 205,
    Mediumorchid = 12211667,
    MediumPurple = 9662680,
    MediumSeaGreen = 3978097,
    MediumSlateBlue = 8087790,
    MediumspringGreen = 64154,
    MediumTurquoise = 4772300,
    MediumVioletRed = 13047173,
    MidnightBlue = 1644912,
    MintCream = 16121850,
    MistyRose = 16770273,
    Moccasin = 16770229,
    NavajoWhite = 16768685,
    Navy = 128,
    OldLace = 16643558,
    Olive = 8421376,
    OliveDrab = 7048739,
    Orange = 16753920,
    OrangeRed = 16729344,
    Orchid = 14315734,
    PaleGoldenRod = 15657130,
    PaleGreen = 10025880,
    PaleTurquoise = 11529966,
    PaleVioletRed = 14184595,
    PapayaWhip = 16773077,
    Peachpuff = 16767673,
    Peru = 13468991,
    Pink = 16761035,
    Plum = 14524637,
    PowderBlue = 11591910,
    Purple = 8388736,
    RebeccaPurple = 6697881,
    Red = 16711680,
    RosyBrown = 12357519,
    RoyalBlue = 4286945,
    SaddleBrown = 9127187,
    Salmon = 16416882,
    SandyBrown = 16032864,
    SeaGreen = 3050327,
    Seashell = 16774638,
    Sienna = 10506797,
    Silver = 12632256,
    SkyBlue = 8900331,
    SlateBlue = 6970061,
    SlateGray = 7372944,
    Snow = 16775930,
    SpringGreen = 65407,
    SteelBlue = 4620980,
    Tan = 13808780,
    Teal = 32896,
    Thistle = 14204888,
    Tomato = 16737095,
    Turquoise = 4251856,
    Violet = 15631086,
    Wheat = 16113331,
    White = 16777215,
    WhiteSmoke = 16119285,
    Yellow = 16776960,
    YellowGreen = 10145074,
    Haxball = 9360043
}
/**
 * A list of geolocation overrides for countries with a presence in the game's community.
 */
export declare const RoomGeoList: {
    readonly SaoPaulo: {
        readonly code: "br";
        readonly lat: -23.533773;
        readonly lon: -46.62529;
    };
    readonly RiodeJaneiro: {
        readonly code: "br";
        readonly lat: -22.970722;
        readonly lon: -43.182365;
    };
    readonly Curitiba: {
        readonly code: "br";
        readonly lat: -25.423164974;
        readonly lon: -49.270998916;
    };
    readonly PortoAlegre: {
        readonly code: "br";
        readonly lat: -30.03306;
        readonly lon: -51.23;
    };
    readonly Salvador: {
        readonly code: "br";
        readonly lat: -12.97111;
        readonly lon: -38.51083;
    };
    readonly Brasilia: {
        readonly code: "br";
        readonly lat: -15.77972;
        readonly lon: -47.92972;
    };
    readonly BeloHorizonte: {
        readonly code: "br";
        readonly lat: -19.92083;
        readonly lon: -43.93778;
    };
    readonly Montevideu: {
        readonly code: "uy";
        readonly lat: -34.90328;
        readonly lon: -56.18816;
    };
    readonly BuenosAires: {
        readonly code: "ar";
        readonly lat: -34.61315;
        readonly lon: -58.37723;
    };
    readonly Cordoba: {
        readonly code: "ar";
        readonly lat: -31.4135;
        readonly lon: -64.18105;
    };
    readonly Rosario: {
        readonly code: "ar";
        readonly lat: -32.94682;
        readonly lon: -60.63932;
    };
    readonly Santiago: {
        readonly code: "cl";
        readonly lat: -33.45694;
        readonly lon: -70.64827;
    };
    readonly Bogota: {
        readonly code: "co";
        readonly lat: 4.60971;
        readonly lon: -74.08175;
    };
    readonly Lisbon: {
        readonly code: "pt";
        readonly lat: 38.71667;
        readonly lon: -9.13333;
    };
    readonly Porto: {
        readonly code: "pt";
        readonly lat: 41.14961;
        readonly lon: -8.61099;
    };
    readonly NewYorkCity: {
        readonly code: "us";
        readonly lat: 40.71427;
        readonly lon: -74.00597;
    };
    readonly LosAngeles: {
        readonly code: "us";
        readonly lat: 34.05223;
        readonly lon: -118.24368;
    };
    readonly Chicago: {
        readonly code: "us";
        readonly lat: 41.85003;
        readonly lon: -87.65005;
    };
    readonly Houston: {
        readonly code: "us";
        readonly lat: 29.76328;
        readonly lon: -95.36327;
    };
    readonly Washington: {
        readonly code: "us";
        readonly lat: 38.89511;
        readonly lon: -77.03637;
    };
    readonly Boston: {
        readonly code: "us";
        readonly lat: 42.35843;
        readonly lon: -71.05977;
    };
    readonly Miami: {
        readonly code: "us";
        readonly lat: 25.77427;
        readonly lon: -80.19366;
    };
    readonly Toronto: {
        readonly code: "ca";
        readonly lat: 43.70011;
        readonly lon: -79.4163;
    };
    readonly Montreal: {
        readonly code: "ca";
        readonly lat: 45.50884;
        readonly lon: -73.58781;
    };
    readonly Madrid: {
        readonly code: "es";
        readonly lat: 40.4165;
        readonly lon: -3.70256;
    };
    readonly Barcelona: {
        readonly code: "es";
        readonly lat: 41.38879;
        readonly lon: 2.15899;
    };
    readonly Valencia: {
        readonly code: "es";
        readonly lat: 39.46975;
        readonly lon: -0.37739;
    };
    readonly Seville: {
        readonly code: "es";
        readonly lat: 37.38283;
        readonly lon: -5.97317;
    };
    readonly Paris: {
        readonly code: "fr";
        readonly lat: 48.85341;
        readonly lon: 2.3488;
    };
    readonly Marseille: {
        readonly code: "fr";
        readonly lat: 43.29695;
        readonly lon: 5.38107;
    };
    readonly Lyon: {
        readonly code: "fr";
        readonly lat: 45.74846;
        readonly lon: 4.84671;
    };
    readonly Toulouse: {
        readonly code: "fr";
        readonly lat: 43.60426;
        readonly lon: 1.44367;
    };
    readonly Nantes: {
        readonly code: "fr";
        readonly lat: 47.21725;
        readonly lon: -1.55336;
    };
    readonly Rome: {
        readonly code: "it";
        readonly lat: 41.89193;
        readonly lon: 12.51133;
    };
    readonly Milan: {
        readonly code: "it";
        readonly lat: 45.46427;
        readonly lon: 9.18951;
    };
    readonly Naples: {
        readonly code: "it";
        readonly lat: 40.85631;
        readonly lon: 14.24641;
    };
    readonly Turin: {
        readonly code: "it";
        readonly lat: 45.07049;
        readonly lon: 7.68682;
    };
    readonly Palermo: {
        readonly code: "it";
        readonly lat: 38.13205;
        readonly lon: 13.33561;
    };
    readonly London: {
        readonly code: "uk";
        readonly lat: 51.50853;
        readonly lon: -0.12574;
    };
    readonly Birmingham: {
        readonly code: "uk";
        readonly lat: 52.48142;
        readonly lon: -1.89983;
    };
    readonly Liverpool: {
        readonly code: "uk";
        readonly lat: 53.41058;
        readonly lon: -2.97794;
    };
    readonly Berlin: {
        readonly code: "de";
        readonly lat: 52.52437;
        readonly lon: 13.41053;
    };
    readonly Hamburg: {
        readonly code: "de";
        readonly lat: 53.57532;
        readonly lon: 10.01534;
    };
    readonly Munich: {
        readonly code: "de";
        readonly lat: 48.13743;
        readonly lon: 11.57549;
    };
    readonly Cologne: {
        readonly code: "de";
        readonly lat: 50.93333;
        readonly lon: 6.95;
    };
    readonly Frankfurt: {
        readonly code: "de";
        readonly lat: 50.11552;
        readonly lon: 8.68417;
    };
    readonly Athens: {
        readonly code: "gr";
        readonly lat: 38.2749497;
        readonly lon: 23.8102717;
    };
    readonly Zagreb: {
        readonly code: "hr";
        readonly lat: 45.81444;
        readonly lon: 15.97798;
    };
    readonly Sarajevo: {
        readonly code: "ba";
        readonly lat: 43.84864;
        readonly lon: 18.35644;
    };
    readonly Moscow: {
        readonly code: "ru";
        readonly lat: 55.75222;
        readonly lon: 37.61556;
    };
    readonly SaintPetersburg: {
        readonly code: "ru";
        readonly lat: 59.93863;
        readonly lon: 30.31413;
    };
    readonly Belgrade: {
        readonly code: "rs";
        readonly lat: 44.80401;
        readonly lon: 20.46513;
    };
    readonly Amsterdam: {
        readonly code: "nl";
        readonly lat: 52.37403;
        readonly lon: 4.88969;
    };
    readonly Istanbul: {
        readonly code: "tr";
        readonly lat: 41.01384;
        readonly lon: 28.94966;
    };
    readonly Ankara: {
        readonly code: "tr";
        readonly lat: 39.91987;
        readonly lon: 32.85427;
    };
    readonly Izmir: {
        readonly code: "tr";
        readonly lat: 38.41273;
        readonly lon: 27.13838;
    };
    readonly Bursa: {
        readonly code: "tr";
        readonly lat: 40.19559;
        readonly lon: 29.06013;
    };
    readonly Adana: {
        readonly code: "tr";
        readonly lat: 37.00167;
        readonly lon: 35.32889;
    };
    readonly Gaziantep: {
        readonly code: "tr";
        readonly lat: 37.05944;
        readonly lon: 37.3825;
    };
    readonly Konya: {
        readonly code: "tr";
        readonly lat: 37.87135;
        readonly lon: 32.48464;
    };
    readonly Antalya: {
        readonly code: "tr";
        readonly lat: 36.90812;
        readonly lon: 30.69556;
    };
    readonly Warsaw: {
        readonly code: "pl";
        readonly lat: 52.22977;
        readonly lon: 21.01178;
    };
    readonly Lodz: {
        readonly code: "pl";
        readonly lat: 51.75;
        readonly lon: 19.46667;
    };
    readonly Krakow: {
        readonly code: "pl";
        readonly lat: 50.06143;
        readonly lon: 19.93658;
    };
    readonly Wroclaw: {
        readonly code: "pl";
        readonly lat: 51.1;
        readonly lon: 17.03333;
    };
    readonly Poznan: {
        readonly code: "pl";
        readonly lat: 52.40692;
        readonly lon: 16.92993;
    };
    readonly Gdansk: {
        readonly code: "pl";
        readonly lat: 54.35205;
        readonly lon: 18.64637;
    };
    readonly Bucharest: {
        readonly code: "ro";
        readonly lat: 44.43225;
        readonly lon: 26.10626;
    };
    readonly Jerusalem: {
        readonly code: "il";
        readonly lat: 31.76904;
        readonly lon: 35.21633;
    };
    readonly TelAviv: {
        readonly code: "il";
        readonly lat: 32.08088;
        readonly lon: 34.78057;
    };
    readonly Tbilisi: {
        readonly code: "ge";
        readonly lat: 41.69411;
        readonly lon: 44.83368;
    };
    readonly Mumbai: {
        readonly code: "in";
        readonly lat: 19.07283;
        readonly lon: 72.88261;
    };
    readonly Delhi: {
        readonly code: "in";
        readonly lat: 28.65195;
        readonly lon: 77.23149;
    };
    readonly Sydney: {
        readonly code: "au";
        readonly lat: -33.86785;
        readonly lon: 151.20732;
    };
    readonly Melbourne: {
        readonly code: "au";
        readonly lat: -37.814;
        readonly lon: 144.96332;
    };
    readonly Brisbane: {
        readonly code: "au";
        readonly lat: -27.46794;
        readonly lon: 153.02809;
    };
    readonly Singapore: {
        readonly code: "sg";
        readonly lat: 1.28967;
        readonly lon: 103.85007;
    };
    readonly Seoul: {
        readonly code: "kr";
        readonly lat: 37.566;
        readonly lon: 126.9784;
    };
    readonly Tokyo: {
        readonly code: "jp";
        readonly lat: 35.6895;
        readonly lon: 139.69171;
    };
};
