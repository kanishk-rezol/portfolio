import  { useState} from "react";
import { motion } from "framer-motion";
import TorchReveal from './modules/TorchReveal';
import Skills from './modules/Skills';
import AboutMe from './modules/aboutme'


const techPatterns: Record<string, number[] | { color: string; indices: number[] }[]> = {
  React: [254,255,266,267,293,294,295,296,297,303,304,305,306,307,308,332,333,334,336,337,338,339,342,343,344,345,347,348,349,372,373,378,379,380,381,382,383,388,389,412,413,419,420,421,422,428,429,452,453,459,460,461,462,468,469,492,493,498,499,501,502,503,508,509,532,533,538,539,540,541,542,543,548,549,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,649,650,651,652,653,654,656,657,664,665,667,668,669,670,671,672,688,689,690,693,694,695,696,699,700,701,702,705,706,707,708,711,712,713,727,728,733,734,735,736,738,739,740,741,742,743,745,746,747,748,753,754,767,768,774,775,778,779,780,781,782,783,786,787,793,794,806,807,814,815,818,819,820,821,822,823,826,827,833,834,835,847,848,853,854,855,856,858,859,860,861,862,863,865,866,867,868,873,874,887,888,889,890,893,894,895,896,899,900,901,902,905,906,907,908,911,912,913,929,930,931,932,933,934,936,937,944,945,947,948,949,950,951,952,971,972,973,974,975,976,977,978,979,983,984,985,986,987,988,989,990,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1052,1053,1058,1059,1062,1063,1068,1069,1092,1093,1098,1099,1100,1101,1102,1103,1108,1109,1132,1133,1139,1140,1141,1142,1148,1149,1172,1173,1179,1180,1181,1182,1188,1189,1212,1213,1218,1219,1220,1221,1222,1223,1228,1229,1252,1253,1256,1257,1258,1259,1263,1264,1265,1267,1268,1269,1293,1294,1295,1296,1297,1298,1303,1304,1305,1306,1307,1308,1346],
  Java: [
    {
      color: "#F44336",
      indices: [183,223,262,263,301,302,303,340,341,342,379,380,381,384,385,386,418,419,420,423,424,425,457,458,459,460,462,463,464,496,497,498,499,501,502,503,536,537,538,541,542,576,577,581,582,583,616,617,621,622,623,657,658,662,663,664,697,698,702,703,704,738,739,743,744,779,783,784,820,822,823]
    },
    {
      color: "#1565C0",
      indices: [813,814,815,828,829,830,851,852,853,865,866,870,871,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,910,911,932,933,934,935,936,937,938,939,940,941,942,950,951,974,975,990,991,1013,1014,1015,1016,1022,1023,1024,1029,1030,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1068,1069,1096,1097,1098,1099,1100,1101,1107,1108,1135,1142,1143,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1209,1210,1211,1212,1215,1216,1217,1218,1219,1220,1221,1222,1223,1230,1248,1249,1250,1251,1269,1270,1289,1290,1291,1292,1307,1308,1309,1310,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1353,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1391,1392,1429,1430,1431,1455,1456,1457,1464,1465,1466,1467,1468,1469,1499,1500,1501,1502,1503,1504,1505]
    }
  ],
  Python: [
    {
      color: "#1565C0",
      indices: [579,580,581,582,583,619,620,621,622,623,659,660,661,662,663,701,702,703,737,738,739,740,741,742,743,736,776,777,778,779,780,781,782,783,816,817,818,819,820,821,822,856,857,858,896,897,936,937,976,977]
    },
    {
      color: "#E58E00",
      indices: [744,745,784,785,824,825,863,864,865,899,900,901,902,903,904,905,939,940,941,942,943,944,945,979,980,981,982,983,984,985,1019,1020,1059,1060,1061,1062,1063,1099,1100,1101,1103,1139,1140,1141,1142]
    }
  ],
  "R Programming": [
    {
      color: "#BABCC0",
      indices: [429,468,469,508,509,510,549,550,551,590,591,631,671,711,751,752,791,831,871,911,950,975,989,990,1014,1015,1016,1017,1028,1029,1053,1054,1055,1056,1057,1058,1094,1095,1096,1097,1098,1103,1104,1136,1137,1138,1143,1144,1145,1178,1183,297,298,299,300,301,302,303,304,335,336,337,338,339,340,341,342,343,344,345,346,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,452,453,454,455,456,457,458,459,466,467,491,492,493,494,495,496,497,530,531,532,533,534,535,536,570,571,572,573,574,575,610,611,612,613,614,650,651,652,653,690,691,692,693,712,729,730,731,732,733,770,771,772,773,810,811,812,813,850,851,852,853,890,891,892,893,894,931,932,933,934,971,972,973,974,1012,1013]
    },
    {
      color: "#1565C0",
      indices: [579,580,581,582,583,584,585,586,587,588,619,620,621,622,623,624,625,626,627,628,629,659,660,661,662,663,664,665,666,667,668,669,699,700,701,702,703,704,705,706,707,708,709,739,740,741,742,746,747,748,749,779,780,781,782,786,787,788,789,819,820,821,822,826,827,828,829,859,860,861,862,863,864,865,866,867,868,869,899,900,901,902,903,904,905,906,907,908,909,939,940,941,942,943,944,945,946,947,948,979,980,981,982,983,984,985,986,1019,1020,1021,1022,1023,1024,1025,1026,1027,1059,1060,1061,1062,1065,1066,1067,1068,1099,1100,1101,1102,1105,1106,1107,1108,1139,1140,1141,1142,1146,1147,1148,1149,1179,1180,1181,1182,1186,1187,1188,1189,1219,1220,1221,1222,1226,1227,1228,1229,1230,1259,1260,1261,1262,1267,1268,1269,1270,1299,1300,1301,1302,1307,1308,1309,1310]
    }
  ],
  Unread: [379,380,381,382,383,416,417,424,425,454,455,466,467,493,508,532,549,572,578,611,617,618,624,630,651,656,657,658,662,663,664,695,696,697,698,699,702,703,704,711,730,737,738,739,742,743,744,751,770,777,778,779,782,783,784,791,810,817,818,819,822,823,824,831,850,857,858,859,862,863,864,871,890,897,898,899,902,903,904,906,911,931,937,938,939,940,941,942,943,944,945,946,971,977,978,979,980,981,982,983,984,985,990,1012,1018,1019,1020,1021,1024,1052,1069,1093,1108,1134,1147,1176,1185,1218,1219,1220,1221,1222,1223],
  MySQL: [
    {
      color: "#1565C0",
      indices: [345, 387, 425, 467, 510, 546, 591, 666, 706, 712, 747, 787, 788, 794, 874, 875, 914, 926, 927, 931, 932, 966, 967, 970, 972, 1006, 1007, 1010, 1012, 1014, 1017, 1046, 1047, 1050, 1052, 1054, 1057, 1086, 1088, 1089, 1090, 1092, 1094, 1097, 1126, 1128, 1129, 1132, 1134, 1137, 1166, 1168, 1169, 1172, 1174, 1175, 1176, 1177, 1217, 1254, 1255, 1256, 1257]
    },
    {
      color: "#E58E00",
      indices: [939, 940, 941, 942, 944, 945, 946, 947, 948, 950, 979, 984, 988, 990, 1019, 1024, 1028, 1030, 1060, 1061, 1062, 1064, 1068, 1070, 1102, 1104, 1108, 1110, 1142, 1144, 1147, 1148, 1150, 1179, 1180, 1181, 1182, 1185, 1186, 1187, 1188, 1191, 1192, 1193, 1228]
    }
  ],
    Adobe: [369,370,371,372,373,374,375,376,377,384,385,386,387,388,389,390,391,392,409,410,411,412,413,414,415,416,417,424,425,426,427,428,429,430,431,432,449,450,451,452,453,454,455,456,465,466,467,468,469,470,471,472,489,490,491,492,493,494,495,496,505,506,507,508,509,510,511,512,529,530,531,532,533,534,535,546,547,548,549,550,551,552,569,570,571,572,573,574,575,586,587,588,589,590,591,592,609,610,611,612,613,614,615,626,627,628,629,630,631,632,649,650,651,652,653,654,667,668,669,670,671,672,689,690,691,692,693,694,707,708,709,710,711,712,729,730,731,732,733,740,741,748,749,750,751,752,769,770,771,772,773,780,781,788,789,790,791,792,809,810,811,812,820,821,829,830,831,832,849,850,851,852,859,860,861,862,869,870,871,872,889,890,891,892,899,900,901,902,909,910,911,912,929,930,931,938,939,940,941,942,943,950,951,952,969,970,971,978,979,980,981,982,983,990,991,992,1009,1010,1018,1019,1020,1021,1022,1023,1031,1032,1049,1050,1061,1062,1063,1064,1071,1072,1089,1090,1102,1103,1104,1111,1112,1129,1142,1143,1144,1145,1152,1169,1182,1183,1184,1185,1192,1223,1224,1225,1226],
    Github:[136,137,138,139,140,141,142,143,144,145,174,175,176,177,178,179,180,181,182,183,184,185,186,187,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,407,408,409,410,411,415,416,417,418,419,420,421,422,423,424,425,426,430,431,432,433,434,446,447,448,449,450,451,456,465,470,471,472,473,474,475,486,487,488,489,490,511,512,513,514,515,525,526,527,528,529,530,551,552,553,554,555,556,565,566,567,568,569,570,571,590,591,592,593,594,595,596,604,605,606,607,608,609,610,631,632,633,634,635,636,637,644,645,646,647,648,649,650,671,672,673,674,675,676,677,684,685,686,687,688,689,712,713,714,715,716,717,724,725,726,727,728,729,752,753,754,755,756,757,764,765,766,767,768,769,792,793,794,795,796,797,804,805,806,807,808,809,832,833,834,835,836,837,844,845,846,847,848,849,872,873,874,875,876,877,884,885,886,887,888,889,890,911,912,913,914,915,916,917,924,925,926,927,928,929,930,951,952,953,954,955,956,957,964,965,966,967,968,969,970,991,992,993,994,995,996,997,1005,1006,1007,1008,1009,1010,1011,1030,1031,1032,1033,1034,1035,1036,1045,1046,1047,1048,1049,1050,1051,1052,1053,1068,1069,1070,1071,1072,1073,1074,1075,1076,1086,1087,1088,1091,1092,1093,1094,1095,1096,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1126,1127,1128,1129,1132,1133,1134,1135,1136,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1167,1168,1169,1170,1173,1174,1175,1176,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1207,1208,1209,1210,1225,1226,1227,1228,1229,1230,1231,1232,1233,1234,1248,1249,1250,1251,1265,1266,1267,1268,1269,1270,1271,1272,1273,1289,1290,1291,1292,1293,1294,1295,1296,1305,1306,1307,1308,1309,1310,1311,1312,1330,1331,1332,1333,1334,1335,1336,1345,1346,1347,1348,1349,1350,1351,1372,1373,1374,1375,1376,1385,1386,1387,1388,1389,1414,1415,1416,1425,1426,1427]
};

function About() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [snakeTrail, setSnakeTrail] = useState<number[]>([]);

  const techIsActive = !!hoveredTech || !!activeTech;
  const currentTech = hoveredTech || activeTech;

  const isHighlighted = (index: number): boolean => {
    if (!currentTech) return false;

    const techPattern = techPatterns[currentTech];

    if (Array.isArray(techPattern)) {
      if (typeof techPattern[0] === "number") {
        return (techPattern as number[]).includes(index);
      } else {
        return (techPattern as { color: string; indices: number[] }[]).some(p =>
          p.indices.includes(index)
        );
      }
    }

    return false;
  };

  const getHighlightColor = (index: number): string | null => {
    if (!currentTech) return null;

    if (currentTech === "React") return "#5AE1FD";
    if (currentTech === "Unread") return "#000000";
    if (currentTech === "Adobe") return "#FA0700";
    if (currentTech ==="Github") return "#000000"

    const techPattern = techPatterns[currentTech];
    if (Array.isArray(techPattern) && typeof techPattern[0] !== "number") {
      for (const pattern of techPattern as { color: string; indices: number[] }[]) {
        if (pattern.indices.includes(index)) return pattern.color;
      }
    }

    return "rgba(253, 224, 71, 1)";
  };

  const getBorderColor = (index: number): string | null => {
    const color = getHighlightColor(index);
    return color ?? null;
  };

  const handleMouseOver = (index: number) => {
    if (techIsActive) return;
    setSnakeTrail(prev => {
      const updated = [...prev, index];
      return updated.length > 10 ? updated.slice(-10) : updated;
    });
  };


  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-8 overflow-auto" id="about">
   <div className="hidden lg:block absolute left-5 top-[1200px] transform -translate-y-1/2 z-10">
    <TorchReveal />
  </div>
  <div className="ml-auto">
    <AboutMe/>
  </div>
        {/* <div className="flex max-w-4xl p-[40px] mx-auto bg-gradient-to-r from-blue-50 via-blue-100 to-white rounded-lg shadow-lg transform lg:mr-20 w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 w-full"
        >
          <motion.h2
            className="text-3xl font-bold text-blue-600 mb-4 tracking-wide"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg leading-relaxed first-line:ml-6"
            style={{ textIndent: "3rem" }} 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            I am a passionate software developer with a solid background in web development, application development, and data analysis. I have developed and deployed various web and mobile applications, utilizing modern technologies to create efficient and user-friendly solutions. With a strong analytical mindset, I leverage data to derive actionable insights and support decision-making processes. I am deeply motivated by solving real-world problems using data-driven approaches and am committed to continually improving my skills and expanding my knowledge in both development and analytics.
          </motion.p>
          <motion.div
            className="flex flex-wrap space-x-6 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              React
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              TypeScript
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Tailwind CSS
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              React Native
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              PowerBi
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              UnReal
            </motion.div>
            
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Adobe Illustrator
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Adobe Photoshop
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Canva
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Spline
            </motion.div>
            <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              CapCut
            </motion.div> <motion.div
              className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SQL
            </motion.div>
          </motion.div>
        </motion.div>
      </div> */}
      <div className="mt-20">
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 w-full"
        >
        <motion.h2
            className="text-3xl  text-blue-600 mb-4 tracking-wide"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            Languages & Software
          </motion.h2>
        </motion.div>
      </div>
      <div className="mt-5">
        <p className="text-[14px]">Transforming ideas into reality, creating innovative, data-driven solutions.</p>
      </div>
      <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-1 mt-10">
        {Array.from({ length: 1600 }, (_, index) => {
          const highlighted = isHighlighted(index);
          const highlightColor = getHighlightColor(index);
          const borderColor = getBorderColor(index);

          return (
            <motion.div
              key={index}
              onMouseOver={() => handleMouseOver(index)}
              className="w-3 h-3 rounded-md border transition-all duration-300"
              style={{
                backgroundColor: highlighted
                  ? highlightColor!
                  : !techIsActive && snakeTrail.includes(index)
                  ? "#93C5FD"
                  : "#F3F4F6",
                borderColor: highlighted
                  ? borderColor!
                  : !techIsActive && snakeTrail.includes(index)
                  ? "#60A5FA"
                  : "transparent"
              }}
            />
          );
        })}
      </div>

      <div className="block md:hidden mt-10">
        <p className="text-[15px]">Press the buttons below.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-lg font-semibold text-blue-600">
        {[
            "React",
            "Java",
            "Python",
            "R Programming",
            "Unread",
            "MySQL",
            "Adobe",
            "Github",
        ].map((tech) => {
        const isActive = activeTech === tech;
        const isHovered = hoveredTech === tech;
        const showGradient = isActive && !isHovered;

    return (
      <span
        key={tech}
        className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300
          ${showGradient ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg scale-105 -translate-y-1" : ""}
          ${isHovered ? "bg-blue-100 text-blue-700" : ""}
        `}
        onMouseEnter={() => {
          setHoveredTech(tech);
          setSnakeTrail([]);
        }}
        onMouseLeave={() => setHoveredTech(null)}
        onClick={() => {
          setActiveTech((prev) => (prev === tech ? null : tech));
          setSnakeTrail([]);
        }}
      >
                {tech}
             </span>
             );
            })}
        </div>
    <div className="mt-20">
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 w-full"
        >
        <motion.h2
            className="text-3xl  text-blue-600 mb-4 tracking-wide"
            whileHover={{ scale: 1.1, color: "#3B82F6" }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            Skills & Expertise
          </motion.h2>
        </motion.div>
    </div>
    <div className="mt-5">
        <p className="text-[14px]">Adopting advanced technologies and proven methodologies to craft scalable and impactful solutions.</p>
    </div>
    <div>
        <Skills/>
    </div>

    </section>
  );
}

export default About;

















// import { motion } from "framer-motion";

// function About() {
//   return (
//     <section id="about" className="w-full py-16">
//       <div className="flex max-w-4xl p-[40px] mx-auto bg-gradient-to-r from-blue-50 via-blue-100 to-white rounded-lg shadow-lg transform lg:mr-20">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="space-y-6 w-full"
//         >
//           <motion.h2
//             className="text-3xl font-bold text-blue-600 mb-4 tracking-wide"
//             whileHover={{ scale: 1.1, color: "#3B82F6" }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             About Me
//           </motion.h2>
//           <motion.p
//             className="text-gray-700 text-lg leading-relaxed"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             I am a passionate frontend developer with experience in building web
//             apps using React, TypeScript, and Tailwind CSS. I enjoy solving
//             problems and creating intuitive user interfaces that are both
//             functional and visually appealing. I am constantly learning new
//             technologies to improve my skills and deliver high-quality solutions.
//           </motion.p>
//           <motion.div
//             className="flex space-x-6 mt-8"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center"
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               React
//             </motion.div>
//             <motion.div
//               className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center"
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               TypeScript
//             </motion.div>
//             <motion.div
//               className="p-4 border rounded-full bg-blue-50 text-blue-600 font-semibold text-center"
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               Tailwind CSS
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default About;



// import { useState } from "react";
// import { motion } from "framer-motion";

// const techPatterns: Record<string, number[] | { color: string; indices: number[] }[]> = {
//   React: [254,255,266,267,293,294,295,296,297,303,304,305,306,307,308,332,333,334,336,337,338,339,342,343,344,345,347,348,349,372,373,378,379,380,381,382,383,388,389,412,413,419,420,421,422,428,429,452,453,459,460,461,462,468,469,492,493,498,499,501,502,503,508,509,532,533,538,539,540,541,542,543,548,549,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,649,650,651,652,653,654,656,657,664,665,667,668,669,670,671,672,688,689,690,693,694,695,696,699,700,701,702,705,706,707,708,711,712,713,727,728,733,734,735,736,738,739,740,741,742,743,745,746,747,748,753,754,767,768,774,775,778,779,780,781,782,783,786,787,793,794,806,807,814,815,818,819,820,821,822,823,826,827,833,834,835,847,848,853,854,855,856,858,859,860,861,862,863,865,866,867,868,873,874,887,888,889,890,893,894,895,896,899,900,901,902,905,906,907,908,911,912,913,929,930,931,932,933,934,936,937,944,945,947,948,949,950,951,952,971,972,973,974,975,976,977,978,979,983,984,985,986,987,988,989,990,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1052,1053,1058,1059,1062,1063,1068,1069,1092,1093,1098,1099,1100,1101,1102,1103,1108,1109,1132,1133,1139,1140,1141,1142,1148,1149,1172,1173,1179,1180,1181,1182,1188,1189,1212,1213,1218,1219,1220,1221,1222,1223,1228,1229,1252,1253,1256,1257,1258,1259,1263,1264,1265,1267,1268,1269,1293,1294,1295,1296,1297,1298,1303,1304,1305,1306,1307,1308,1346],
//   Java: [
//     {
//       color: "#F44336",
//       indices: [43,183,223,262,263,301,302,303,340,341,342,379,380,381,384,385,386,418,419,420,423,424,425,457,458,459,460,462,463,464,496,497,498,499,501,502,503,536,537,538,541,542,576,577,581,582,583,616,617,621,622,623,657,658,662,663,664,697,698,702,703,704,738,739,743,744,779,783,784,820,822,823]
//     },
//     {
//       color: "#1565C0",
//       indices: [813,814,815,828,829,830,851,852,853,865,866,870,871,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,910,911,932,933,934,935,936,937,938,939,940,941,942,950,951,974,975,990,991,1013,1014,1015,1016,1022,1023,1024,1029,1030,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1068,1069,1096,1097,1098,1099,1100,1101,1107,1108,1135,1142,1143,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1209,1210,1211,1212,1215,1216,1217,1218,1219,1220,1221,1222,1223,1230,1248,1249,1250,1251,1269,1270,1289,1290,1291,1292,1307,1308,1309,1310,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1353,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1391,1392,1429,1430,1431,1455,1456,1457,1464,1465,1466,1467,1468,1469,1499,1500,1501,1502,1503,1504,1505]
//     }
//   ],
//   Python: [
//     {
//       color: "#1565C0",
//       indices: [579,580,581,582,583,619,620,621,622,623,659,660,661,662,663,701,702,703,737,738,739,740,741,742,743,736,776,777,778,779,780,781,782,783,816,817,818,819,820,821,822,856,857,858,896,897,936,937,976,977]
//     },
//     {
//       color: "#E58E00",
//       indices: [744,745,784,785,824,825,863,864,865,899,900,901,902,903,904,905,939,940,941,942,943,944,945,979,980,981,982,983,984,985,1019,1020,1059,1060,1061,1062,1063,1099,1100,1101,1103,1139,1140,1141,1142]
//     }
//   ],
//   "R Programming": [
//     {
//       color: "#BABCC0",
//       indices: [429,468,469,508,509,510,549,550,551,590,591,631,671,711,751,752,791,831,871,911,950,975,989,990,1014,1015,1016,1017,1028,1029,1053,1054,1055,1056,1057,1058,1094,1095,1096,1097,1098,1103,1104,1136,1137,1138,1143,1144,1145,1178,1183,297,298,299,300,301,302,303,304,335,336,337,338,339,340,341,342,343,344,345,346,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,452,453,454,455,456,457,458,459,466,467,491,492,493,494,495,496,497,530,531,532,533,534,535,536,570,571,572,573,574,575,610,611,612,613,614,650,651,652,653,690,691,692,693,712,729,730,731,732,733,770,771,772,773,810,811,812,813,850,851,852,853,890,891,892,893,894,931,932,933,934,971,972,973,974,1012,1013]
//     },
//     {
//       color: "#1565C0",
//       indices: [579,580,581,582,583,584,585,586,587,588,619,620,621,622,623,624,625,626,627,628,629,659,660,661,662,663,664,665,666,667,668,669,699,700,701,702,703,704,705,706,707,708,709,739,740,741,742,746,747,748,749,779,780,781,782,786,787,788,789,819,820,821,822,826,827,828,829,859,860,861,862,863,864,865,866,867,868,869,899,900,901,902,903,904,905,906,907,908,909,939,940,941,942,943,944,945,946,947,948,979,980,981,982,983,984,985,986,1019,1020,1021,1022,1023,1024,1025,1026,1027,1059,1060,1061,1062,1065,1066,1067,1068,1099,1100,1101,1102,1105,1106,1107,1108,1139,1140,1141,1142,1146,1147,1148,1149,1179,1180,1181,1182,1186,1187,1188,1189,1219,1220,1221,1222,1226,1227,1228,1229,1230,1259,1260,1261,1262,1267,1268,1269,1270,1299,1300,1301,1302,1307,1308,1309,1310]
//     }
//   ],
//   Unread: [379,380,381,382,383,416,417,424,425,454,455,466,467,493,508,532,549,572,578,611,617,618,624,630,651,656,657,658,662,663,664,695,696,697,698,699,702,703,704,711,730,737,738,739,742,743,744,751,770,777,778,779,782,783,784,791,810,817,818,819,822,823,824,831,850,857,858,859,862,863,864,871,890,897,898,899,902,903,904,906,911,931,937,938,939,940,941,942,943,944,945,946,971,977,978,979,980,981,982,983,984,985,990,1012,1018,1019,1020,1021,1024,1052,1069,1093,1108,1134,1147,1176,1185,1218,1219,1220,1221,1222,1223],
//   MySQL: [
//     {
//       color: "#1565C0",
//       indices: [345, 387, 425, 467, 510, 546, 591, 666, 706, 712, 747, 787, 788, 794, 874, 875, 914, 926, 927, 931, 932, 966, 967, 970, 972, 1006, 1007, 1010, 1012, 1014, 1017, 1046, 1047, 1050, 1052, 1054, 1057, 1086, 1088, 1089, 1090, 1092, 1094, 1097, 1126, 1128, 1129, 1132, 1134, 1137, 1166, 1168, 1169, 1172, 1174, 1175, 1176, 1177, 1217, 1254, 1255, 1256, 1257]
//     },
//     {
//       color: "#E58E00",
//       indices: [939, 940, 941, 942, 944, 945, 946, 947, 948, 950, 979, 984, 988, 990, 1019, 1024, 1028, 1030, 1060, 1061, 1062, 1064, 1068, 1070, 1102, 1104, 1108, 1110, 1142, 1144, 1147, 1148, 1150, 1179, 1180, 1181, 1182, 1185, 1186, 1187, 1188, 1191, 1192, 1193, 1228]
//     }
//   ],
//     Adobe: [369,370,371,372,373,374,375,376,377,384,385,386,387,388,389,390,391,392,409,410,411,412,413,414,415,416,417,424,425,426,427,428,429,430,431,432,449,450,451,452,453,454,455,456,465,466,467,468,469,470,471,472,489,490,491,492,493,494,495,496,505,506,507,508,509,510,511,512,529,530,531,532,533,534,535,546,547,548,549,550,551,552,569,570,571,572,573,574,575,586,587,588,589,590,591,592,609,610,611,612,613,614,615,626,627,628,629,630,631,632,649,650,651,652,653,654,667,668,669,670,671,672,689,690,691,692,693,694,707,708,709,710,711,712,729,730,731,732,733,740,741,748,749,750,751,752,769,770,771,772,773,780,781,788,789,790,791,792,809,810,811,812,820,821,829,830,831,832,849,850,851,852,859,860,861,862,869,870,871,872,889,890,891,892,899,900,901,902,909,910,911,912,929,930,931,938,939,940,941,942,943,950,951,952,969,970,971,978,979,980,981,982,983,990,991,992,1009,1010,1018,1019,1020,1021,1022,1023,1031,1032,1049,1050,1061,1062,1063,1064,1071,1072,1089,1090,1102,1103,1104,1111,1112,1129,1142,1143,1144,1145,1152,1169,1182,1183,1184,1185,1192,1223,1224,1225,1226],

// };

// function TechGrid() {
//   const [hoveredTech, setHoveredTech] = useState<string | null>(null);
//   const [activeTech, setActiveTech] = useState<string | null>(null);
//   const [snakeTrail, setSnakeTrail] = useState<number[]>([]);

//   const techIsActive = !!hoveredTech || !!activeTech;
//   const currentTech = hoveredTech || activeTech;

//   const isHighlighted = (index: number): boolean => {
//     if (!currentTech) return false;

//     const techPattern = techPatterns[currentTech];

//     if (Array.isArray(techPattern)) {
//       if (typeof techPattern[0] === "number") {
//         return (techPattern as number[]).includes(index);
//       } else {
//         return (techPattern as { color: string; indices: number[] }[]).some(p =>
//           p.indices.includes(index)
//         );
//       }
//     }

//     return false;
//   };

//   const getHighlightColor = (index: number): string | null => {
//     if (!currentTech) return null;

//     if (currentTech === "React") return "#5AE1FD";
//     if (currentTech === "Unread") return "#000000";
//     if (currentTech === "Adobe") return "#FA0700";

//     const techPattern = techPatterns[currentTech];
//     if (Array.isArray(techPattern) && typeof techPattern[0] !== "number") {
//       for (const pattern of techPattern as { color: string; indices: number[] }[]) {
//         if (pattern.indices.includes(index)) return pattern.color;
//       }
//     }

//     return "rgba(253, 224, 71, 1)";
//   };

//   const getBorderColor = (index: number): string | null => {
//     const color = getHighlightColor(index);
//     return color ?? null;
//   };

//   const handleMouseOver = (index: number) => {
//     if (techIsActive) return;
//     setSnakeTrail(prev => {
//       const updated = [...prev, index];
//       return updated.length > 10 ? updated.slice(-10) : updated;
//     });
//   };

//   return (
//     <section className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-8 overflow-auto">
//       <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-1">
//         {Array.from({ length: 1600 }, (_, index) => {
//           const highlighted = isHighlighted(index);
//           const highlightColor = getHighlightColor(index);
//           const borderColor = getBorderColor(index);

//           return (
//             <motion.div
//               key={index}
//               onMouseOver={() => handleMouseOver(index)}
//               className="w-3 h-3 rounded-md border transition-all duration-300"
//               style={{
//                 backgroundColor: highlighted
//                   ? highlightColor!
//                   : !techIsActive && snakeTrail.includes(index)
//                   ? "#93C5FD"
//                   : "#F3F4F6",
//                 borderColor: highlighted
//                   ? borderColor!
//                   : !techIsActive && snakeTrail.includes(index)
//                   ? "#60A5FA"
//                   : "transparent"
//               }}
//             />
//           );
//         })}
//       </div>

//       <div className="flex flex-wrap justify-center gap-6 mt-8 text-lg font-semibold text-blue-600">
//         {["React", "Java", "Python", "R Programming", "Unread", "MySQL","Adobe"].map(tech => (
//           <span
//             key={tech}
//             className={`cursor-pointer hover:underline ${
//               activeTech === tech && !hoveredTech ? "text-blue-800" : ""
//             }`}
//             onMouseEnter={() => {
//               setHoveredTech(tech);
//               setSnakeTrail([]);
//             }}
//             onMouseLeave={() => setHoveredTech(null)}
//             onClick={() => {
//               setActiveTech(prev => (prev === tech ? null : tech));
//               setSnakeTrail([]);
//             }}
//           >
//             {tech}
//           </span>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default TechGrid;



