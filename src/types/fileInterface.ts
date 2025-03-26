export interface FileInterface extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;  
    size: number;
    type: string;
    lastModifiedDate?: Date

    // for directory uploads
}