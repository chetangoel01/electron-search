import { IpcMainEvent, ipcMain, shell} from "electron";
import { IPCACTIONS } from "./ipcactions";

const {
    OPEN_FILE
} = IPCACTIONS.File;

const handleOpenFile = (event: IpcMainEvent, title: string) => {
    // const filename = event?.sender;
    shell.openPath(title);
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