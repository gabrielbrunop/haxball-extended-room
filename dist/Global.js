"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGeoList = exports.Colors = exports.ChatStyle = exports.ChatSounds = exports.Stadiums = exports.Teams = void 0;
var Teams;
(function (Teams) {
    Teams[Teams["Spectators"] = 0] = "Spectators";
    Teams[Teams["Red"] = 1] = "Red";
    Teams[Teams["Blue"] = 2] = "Blue";
})(Teams = exports.Teams || (exports.Teams = {}));
var Stadiums;
(function (Stadiums) {
    Stadiums["Classic"] = "Classic";
    Stadiums["Easy"] = "Easy";
    Stadiums["Small"] = "Small";
    Stadiums["Big"] = "Big";
    Stadiums["Rounded"] = "Rounded";
    Stadiums["Hockey"] = "Hockey";
    Stadiums["BigHockey"] = "BigHockey";
    Stadiums["BigEasy"] = "BigEasy";
    Stadiums["BigRounded"] = "BigRounded";
    Stadiums["Huge"] = "Huge";
})(Stadiums = exports.Stadiums || (exports.Stadiums = {}));
var ChatSounds;
(function (ChatSounds) {
    ChatSounds[ChatSounds["None"] = 0] = "None";
    ChatSounds[ChatSounds["Normal"] = 1] = "Normal";
    ChatSounds[ChatSounds["Notification"] = 2] = "Notification";
})(ChatSounds = exports.ChatSounds || (exports.ChatSounds = {}));
var ChatStyle;
(function (ChatStyle) {
    ChatStyle["Normal"] = "normal";
    ChatStyle["Bold"] = "bold";
    ChatStyle["Italic"] = "italic";
    ChatStyle["Small"] = "small";
    ChatStyle["SmallBold"] = "small-bold";
    ChatStyle["SmallItalic"] = "small-italic";
})(ChatStyle = exports.ChatStyle || (exports.ChatStyle = {}));
var Colors;
(function (Colors) {
    Colors[Colors["AliceBlue"] = 15792383] = "AliceBlue";
    Colors[Colors["AntiqueWhite"] = 16444375] = "AntiqueWhite";
    Colors[Colors["Aqua"] = 65535] = "Aqua";
    Colors[Colors["AquaMarine"] = 8388564] = "AquaMarine";
    Colors[Colors["Azure"] = 15794175] = "Azure";
    Colors[Colors["Beige"] = 16119260] = "Beige";
    Colors[Colors["Bisque"] = 16770244] = "Bisque";
    Colors[Colors["Black"] = 0] = "Black";
    Colors[Colors["BlancheDalmond"] = 16772045] = "BlancheDalmond";
    Colors[Colors["Blue"] = 255] = "Blue";
    Colors[Colors["BlueViolet"] = 9055202] = "BlueViolet";
    Colors[Colors["Brown"] = 10824234] = "Brown";
    Colors[Colors["Burlywood"] = 14596231] = "Burlywood";
    Colors[Colors["CadetBlue"] = 6266528] = "CadetBlue";
    Colors[Colors["Chartreuse"] = 8388352] = "Chartreuse";
    Colors[Colors["Chocolate"] = 13789470] = "Chocolate";
    Colors[Colors["Coral"] = 16744272] = "Coral";
    Colors[Colors["CornflowerBlue"] = 6591981] = "CornflowerBlue";
    Colors[Colors["Cornsilk"] = 16775388] = "Cornsilk";
    Colors[Colors["Crimson"] = 14423100] = "Crimson";
    Colors[Colors["Cyan"] = 65535] = "Cyan";
    Colors[Colors["DarkBlue"] = 139] = "DarkBlue";
    Colors[Colors["DarkCyan"] = 35723] = "DarkCyan";
    Colors[Colors["DarkGoldenRod"] = 12092939] = "DarkGoldenRod";
    Colors[Colors["DarkGray"] = 11119017] = "DarkGray";
    Colors[Colors["DarkGreen"] = 25600] = "DarkGreen";
    Colors[Colors["DarkKhaki"] = 12433259] = "DarkKhaki";
    Colors[Colors["DarkMagenta"] = 9109643] = "DarkMagenta";
    Colors[Colors["DarkOliveGreen"] = 5597999] = "DarkOliveGreen";
    Colors[Colors["DarkOrange"] = 16747520] = "DarkOrange";
    Colors[Colors["DarkOrchid"] = 10040012] = "DarkOrchid";
    Colors[Colors["DarkRed"] = 9109504] = "DarkRed";
    Colors[Colors["DarkSalmon"] = 15308410] = "DarkSalmon";
    Colors[Colors["DarkseaGreen"] = 9419919] = "DarkseaGreen";
    Colors[Colors["DarkSlateBlue"] = 4734347] = "DarkSlateBlue";
    Colors[Colors["DarkSlateGray"] = 3100495] = "DarkSlateGray";
    Colors[Colors["DarkTurquoise"] = 52945] = "DarkTurquoise";
    Colors[Colors["DarkViolet"] = 9699539] = "DarkViolet";
    Colors[Colors["DeepPink"] = 16716947] = "DeepPink";
    Colors[Colors["DeepSkyBlue"] = 49151] = "DeepSkyBlue";
    Colors[Colors["DimGray"] = 6908265] = "DimGray";
    Colors[Colors["DodgerBlue"] = 2003199] = "DodgerBlue";
    Colors[Colors["Firebrick"] = 11674146] = "Firebrick";
    Colors[Colors["FloralWhite"] = 16775920] = "FloralWhite";
    Colors[Colors["ForestGreen"] = 2263842] = "ForestGreen";
    Colors[Colors["Fuchsia"] = 16711935] = "Fuchsia";
    Colors[Colors["Gainsboro"] = 14474460] = "Gainsboro";
    Colors[Colors["GhostWhite"] = 16316671] = "GhostWhite";
    Colors[Colors["Gold"] = 16766720] = "Gold";
    Colors[Colors["GoldenRod"] = 14329120] = "GoldenRod";
    Colors[Colors["Gray"] = 8421504] = "Gray";
    Colors[Colors["Green"] = 32768] = "Green";
    Colors[Colors["GreenYellow"] = 11403055] = "GreenYellow";
    Colors[Colors["Honeydew"] = 15794160] = "Honeydew";
    Colors[Colors["HotPink"] = 16738740] = "HotPink";
    Colors[Colors["IndianRed"] = 13458524] = "IndianRed";
    Colors[Colors["Indigo"] = 4915330] = "Indigo";
    Colors[Colors["Ivory"] = 16777200] = "Ivory";
    Colors[Colors["Khaki"] = 15787660] = "Khaki";
    Colors[Colors["Lavender"] = 15132410] = "Lavender";
    Colors[Colors["Lavenderblush"] = 16773365] = "Lavenderblush";
    Colors[Colors["LawnGreen"] = 8190976] = "LawnGreen";
    Colors[Colors["LemonChiffon"] = 16775885] = "LemonChiffon";
    Colors[Colors["LightBlue"] = 11393254] = "LightBlue";
    Colors[Colors["Lightcoral"] = 15761536] = "Lightcoral";
    Colors[Colors["LightCyan"] = 14745599] = "LightCyan";
    Colors[Colors["LightGoldenRodYellow"] = 16448210] = "LightGoldenRodYellow";
    Colors[Colors["LightGrey"] = 13882323] = "LightGrey";
    Colors[Colors["LightGreen"] = 9498256] = "LightGreen";
    Colors[Colors["LightPink"] = 16758465] = "LightPink";
    Colors[Colors["LightSalmon"] = 16752762] = "LightSalmon";
    Colors[Colors["LightSeaGreen"] = 2142890] = "LightSeaGreen";
    Colors[Colors["LightSkyBlue"] = 8900346] = "LightSkyBlue";
    Colors[Colors["LightSlateGray"] = 7833753] = "LightSlateGray";
    Colors[Colors["LightSteelBlue"] = 11584734] = "LightSteelBlue";
    Colors[Colors["LightYellow"] = 16777184] = "LightYellow";
    Colors[Colors["Lime"] = 65280] = "Lime";
    Colors[Colors["LimeGreen"] = 3329330] = "LimeGreen";
    Colors[Colors["Linen"] = 16445670] = "Linen";
    Colors[Colors["Magenta"] = 16711935] = "Magenta";
    Colors[Colors["Maroon"] = 8388608] = "Maroon";
    Colors[Colors["MediumAquamarine"] = 6737322] = "MediumAquamarine";
    Colors[Colors["MediumBlue"] = 205] = "MediumBlue";
    Colors[Colors["Mediumorchid"] = 12211667] = "Mediumorchid";
    Colors[Colors["MediumPurple"] = 9662680] = "MediumPurple";
    Colors[Colors["MediumSeaGreen"] = 3978097] = "MediumSeaGreen";
    Colors[Colors["MediumSlateBlue"] = 8087790] = "MediumSlateBlue";
    Colors[Colors["MediumspringGreen"] = 64154] = "MediumspringGreen";
    Colors[Colors["MediumTurquoise"] = 4772300] = "MediumTurquoise";
    Colors[Colors["MediumVioletRed"] = 13047173] = "MediumVioletRed";
    Colors[Colors["MidnightBlue"] = 1644912] = "MidnightBlue";
    Colors[Colors["MintCream"] = 16121850] = "MintCream";
    Colors[Colors["MistyRose"] = 16770273] = "MistyRose";
    Colors[Colors["Moccasin"] = 16770229] = "Moccasin";
    Colors[Colors["NavajoWhite"] = 16768685] = "NavajoWhite";
    Colors[Colors["Navy"] = 128] = "Navy";
    Colors[Colors["OldLace"] = 16643558] = "OldLace";
    Colors[Colors["Olive"] = 8421376] = "Olive";
    Colors[Colors["OliveDrab"] = 7048739] = "OliveDrab";
    Colors[Colors["Orange"] = 16753920] = "Orange";
    Colors[Colors["OrangeRed"] = 16729344] = "OrangeRed";
    Colors[Colors["Orchid"] = 14315734] = "Orchid";
    Colors[Colors["PaleGoldenRod"] = 15657130] = "PaleGoldenRod";
    Colors[Colors["PaleGreen"] = 10025880] = "PaleGreen";
    Colors[Colors["PaleTurquoise"] = 11529966] = "PaleTurquoise";
    Colors[Colors["PaleVioletRed"] = 14184595] = "PaleVioletRed";
    Colors[Colors["PapayaWhip"] = 16773077] = "PapayaWhip";
    Colors[Colors["Peachpuff"] = 16767673] = "Peachpuff";
    Colors[Colors["Peru"] = 13468991] = "Peru";
    Colors[Colors["Pink"] = 16761035] = "Pink";
    Colors[Colors["Plum"] = 14524637] = "Plum";
    Colors[Colors["PowderBlue"] = 11591910] = "PowderBlue";
    Colors[Colors["Purple"] = 8388736] = "Purple";
    Colors[Colors["RebeccaPurple"] = 6697881] = "RebeccaPurple";
    Colors[Colors["Red"] = 16711680] = "Red";
    Colors[Colors["RosyBrown"] = 12357519] = "RosyBrown";
    Colors[Colors["RoyalBlue"] = 4286945] = "RoyalBlue";
    Colors[Colors["SaddleBrown"] = 9127187] = "SaddleBrown";
    Colors[Colors["Salmon"] = 16416882] = "Salmon";
    Colors[Colors["SandyBrown"] = 16032864] = "SandyBrown";
    Colors[Colors["SeaGreen"] = 3050327] = "SeaGreen";
    Colors[Colors["Seashell"] = 16774638] = "Seashell";
    Colors[Colors["Sienna"] = 10506797] = "Sienna";
    Colors[Colors["Silver"] = 12632256] = "Silver";
    Colors[Colors["SkyBlue"] = 8900331] = "SkyBlue";
    Colors[Colors["SlateBlue"] = 6970061] = "SlateBlue";
    Colors[Colors["SlateGray"] = 7372944] = "SlateGray";
    Colors[Colors["Snow"] = 16775930] = "Snow";
    Colors[Colors["SpringGreen"] = 65407] = "SpringGreen";
    Colors[Colors["SteelBlue"] = 4620980] = "SteelBlue";
    Colors[Colors["Tan"] = 13808780] = "Tan";
    Colors[Colors["Teal"] = 32896] = "Teal";
    Colors[Colors["Thistle"] = 14204888] = "Thistle";
    Colors[Colors["Tomato"] = 16737095] = "Tomato";
    Colors[Colors["Turquoise"] = 4251856] = "Turquoise";
    Colors[Colors["Violet"] = 15631086] = "Violet";
    Colors[Colors["Wheat"] = 16113331] = "Wheat";
    Colors[Colors["White"] = 16777215] = "White";
    Colors[Colors["WhiteSmoke"] = 16119285] = "WhiteSmoke";
    Colors[Colors["Yellow"] = 16776960] = "Yellow";
    Colors[Colors["YellowGreen"] = 10145074] = "YellowGreen";
    Colors[Colors["Haxball"] = 9360043] = "Haxball";
})(Colors = exports.Colors || (exports.Colors = {}));
/**
 * A list of geolocation overrides for countries with a presence in the game's community.
 */
exports.RoomGeoList = {
    // Brazil
    SaoPaulo: { code: "br", lat: -23.533773, lon: -46.625290 },
    RiodeJaneiro: { code: "br", lat: -22.970722, lon: -43.182365 },
    Curitiba: { code: "br", lat: -25.423164974, lon: -49.270998916 },
    PortoAlegre: { code: "br", lat: -30.03306, lon: -51.23 },
    Salvador: { code: "br", lat: -12.97111, lon: -38.51083 },
    Brasilia: { code: "br", lat: -15.77972, lon: -47.92972 },
    BeloHorizonte: { code: "br", lat: -19.92083, lon: -43.93778 },
    // Uruguay
    Montevideu: { code: "uy", lat: -34.90328, lon: -56.18816 },
    // Argentina
    BuenosAires: { code: "ar", lat: -34.61315, lon: -58.37723 },
    Cordoba: { code: "ar", lat: -31.4135, lon: -64.18105 },
    Rosario: { code: "ar", lat: -32.94682, lon: -60.63932 },
    // Chile
    Santiago: { code: "cl", lat: -33.45694, lon: -70.64827 },
    // Colombia
    Bogota: { code: "co", lat: 4.60971, lon: -74.08175 },
    // Portugal
    Lisbon: { code: "pt", lat: 38.71667, lon: -9.13333 },
    Porto: { code: "pt", lat: 41.14961, lon: -8.61099 },
    // United States
    NewYorkCity: { code: "us", lat: 40.71427, lon: -74.00597 },
    LosAngeles: { code: "us", lat: 34.05223, lon: -118.24368 },
    Chicago: { code: "us", lat: 41.85003, lon: -87.65005 },
    Houston: { code: "us", lat: 29.76328, lon: -95.36327 },
    Washington: { code: "us", lat: 38.89511, lon: -77.03637 },
    Boston: { code: "us", lat: 42.35843, lon: -71.05977 },
    Miami: { code: "us", lat: 25.77427, lon: -80.19366 },
    // Canada
    Toronto: { code: "ca", lat: 43.70011, lon: -79.4163 },
    Montreal: { code: "ca", lat: 45.50884, lon: -73.58781 },
    // Spain
    Madrid: { code: "es", lat: 40.4165, lon: -3.70256 },
    Barcelona: { code: "es", lat: 41.38879, lon: 2.15899 },
    Valencia: { code: "es", lat: 39.46975, lon: -0.37739 },
    Seville: { code: "es", lat: 37.38283, lon: -5.97317 },
    // France
    Paris: { code: "fr", lat: 48.85341, lon: 2.3488 },
    Marseille: { code: "fr", lat: 43.29695, lon: 5.38107 },
    Lyon: { code: "fr", lat: 45.74846, lon: 4.84671 },
    Toulouse: { code: "fr", lat: 43.60426, lon: 1.44367 },
    Nantes: { code: "fr", lat: 47.21725, lon: -1.55336 },
    // Italy
    Rome: { code: "it", lat: 41.89193, lon: 12.51133 },
    Milan: { code: "it", lat: 45.46427, lon: 9.18951 },
    Naples: { code: "it", lat: 40.85631, lon: 14.24641 },
    Turin: { code: "it", lat: 45.07049, lon: 7.68682 },
    Palermo: { code: "it", lat: 38.13205, lon: 13.33561 },
    // United Kingdom
    London: { code: "uk", lat: 51.50853, lon: -0.12574 },
    Birmingham: { code: "uk", lat: 52.48142, lon: -1.89983 },
    Liverpool: { code: "uk", lat: 53.41058, lon: -2.97794 },
    // Germany
    Berlin: { code: "de", lat: 52.52437, lon: 13.41053 },
    Hamburg: { code: "de", lat: 53.57532, lon: 10.01534 },
    Munich: { code: "de", lat: 48.13743, lon: 11.57549 },
    Cologne: { code: "de", lat: 50.93333, lon: 6.95 },
    Frankfurt: { code: "de", lat: 50.11552, lon: 8.68417 },
    // Greece
    Athens: { code: "gr", lat: 38.2749497, lon: 23.8102717 },
    // Croatia
    Zagreb: { code: "hr", lat: 45.81444, lon: 15.97798 },
    // Bosnia
    Sarajevo: { code: "ba", lat: 43.84864, lon: 18.35644 },
    // Russia
    Moscow: { code: "ru", lat: 55.75222, lon: 37.61556 },
    SaintPetersburg: { code: "ru", lat: 59.93863, lon: 30.31413 },
    // Serbia
    Belgrade: { code: "rs", lat: 44.80401, lon: 20.46513 },
    // Netherlands
    Amsterdam: { code: "nl", lat: 52.37403, lon: 4.88969 },
    // Turkey
    Istanbul: { code: "tr", lat: 41.01384, lon: 28.94966 },
    Ankara: { code: "tr", lat: 39.91987, lon: 32.85427 },
    Izmir: { code: "tr", lat: 38.41273, lon: 27.13838 },
    Bursa: { code: "tr", lat: 40.19559, lon: 29.06013 },
    Adana: { code: "tr", lat: 37.00167, lon: 35.32889 },
    Gaziantep: { code: "tr", lat: 37.05944, lon: 37.3825 },
    Konya: { code: "tr", lat: 37.87135, lon: 32.48464 },
    Antalya: { code: "tr", lat: 36.90812, lon: 30.69556 },
    // Poland
    Warsaw: { code: "pl", lat: 52.22977, lon: 21.01178 },
    Lodz: { code: "pl", lat: 51.75, lon: 19.46667 },
    Krakow: { code: "pl", lat: 50.06143, lon: 19.93658 },
    Wroclaw: { code: "pl", lat: 51.1, lon: 17.03333 },
    Poznan: { code: "pl", lat: 52.40692, lon: 16.92993 },
    Gdansk: { code: "pl", lat: 54.35205, lon: 18.64637 },
    // Romania
    Bucharest: { code: "ro", lat: 44.43225, lon: 26.10626 },
    // Israel
    Jerusalem: { code: "il", lat: 31.76904, lon: 35.21633 },
    TelAviv: { code: "il", lat: 32.08088, lon: 34.78057 },
    // Georgia
    Tbilisi: { code: "ge", lat: 41.69411, lon: 44.83368 },
    // India
    Mumbai: { code: "in", lat: 19.07283, lon: 72.88261 },
    Delhi: { code: "in", lat: 28.65195, lon: 77.23149 },
    // Australia
    Sydney: { code: "au", lat: -33.86785, lon: 151.20732 },
    Melbourne: { code: "au", lat: -37.814, lon: 144.96332 },
    Brisbane: { code: "au", lat: -27.46794, lon: 153.02809 },
    // Singapore
    Singapore: { code: "sg", lat: 1.28967, lon: 103.85007 },
    // South Korea
    Seoul: { code: "kr", lat: 37.566, lon: 126.9784 },
    // Japan
    Tokyo: { code: "jp", lat: 35.6895, lon: 139.69171 }
};
//# sourceMappingURL=Global.js.map