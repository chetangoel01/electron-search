import { IpcMainEvent, ipcMain, shell} from "electron";
import { IPCACTIONS } from "./ipcactions";

const {
    OPEN_FILE
} = IPCACTIONS.File;

const handleOpenFile = (event: IpcMainEvent, title: string) => {
    console.log(title)
    // const filename = event?.sender;
    shell.openPath(title);
    // shell.openPath('K:\\C&P-G\\GranTek Inc\\Green Bay WI\\00049\\Test Data\\Test Data-GranTek-000313.xls')
}

const ipcHandlers = [
    {
        event: OPEN_FILE,
        callback: handleOpenFile
    }
]

export const registerIpcHandlers = () => {
    ipcHandlers.forEach((handler: {event: string, callback: any}) => {
        ipcMain.on(handler.event, handler.callback);
    });
}