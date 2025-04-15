
/** 
 *  return a background color hexocde based on a @param {string} severity
 *   which is from 0-10
 *   returned value is 
 * 
 *   '#b0f7bd' "#f7ddb0" "#f7b4b0"
 *   
*/



export const getBgColorByMindType = (mindType: string): string=> {

    const colorObj = {
        "calm": "#fab3af",
        "relaxed": "#fad3af",
        "energized":"#faf1af",
        'focus':'#ebfaaf',
        'productivity':'#c7faaf',
        'memory':'#9dfaae',
        'problem solving':'#9dfad2',
        'creativity':'#9dfaf5',
        'alertness':'#9db6fa',
        'brain fog':'#a49dfa',
        'stress':'#c69dfa',
        'positivity':'#de9dfa',
        'sensivity':'#f79dfa',
        "socialability":'#f27cdb',
        "calmness":'#4a2dc2',
        "anxiety":'#4a2dc2',
        "irritability":'#3ec7be'
    }as Record<string, string>;
    

    return colorObj[mindType]
    
}

