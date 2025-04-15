export interface mindInterface  {
    mindId: string,
    date: string,
    mindType: 'meditation'| 'cognition' | 'mood',
    data: { [key: string]: number;} & (meditationInterface | cognitionInterface | moodInterface),
    note: string,
}



export interface meditationInterface {
    "calm": number,
    "relaxed": number,
    "energized":number
}

export interface cognitionInterface {
    'focus':number,
    'productivity':number,
    'memory':number,
    'problem solving':number,
    'creativity':number,
    'alertness':number,
    'brain fog':number
}

export interface moodInterface {
    'stress':number,
    'positivity':number,
    'sensivity':number,
    "socialability":number,
    "calmness":number,
    "anxiety":number,
    "irritability":number
}