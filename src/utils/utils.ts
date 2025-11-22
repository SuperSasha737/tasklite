const MAX_TITLE_LENGTH = 50;

export function  isValidTaskTitle(title: string): boolean{
    const strTest: boolean = /\S/.test(title);
    const lgh:number = title.length;  
   
    let TitleIsRight: boolean = true;
   
    if (strTest == true && lgh<=MAX_TITLE_LENGTH){
        return TitleIsRight;
    } else {
        TitleIsRight = false;
        return TitleIsRight;
    };
};

export function normalizeTitle(title: string): string {
    let resultTitle:boolean = isValidTaskTitle(title);
    if (resultTitle){
        return title.trim().replace(/ {2,}/g, " ");
    } else {
        return title;
    };
};  


