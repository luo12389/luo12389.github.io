// TypeScript file
class RIOEvent extends egret.Event
{
    public static CHANGE_SCENE_EVENT:string = "changesceneevent";
    public eventType:any;//事件类型
    public prizeNum = 0;
    public count = 0;
    public obj:any;//对象
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);

    }
}