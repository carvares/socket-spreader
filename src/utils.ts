export class TipsStorage {
  public tips: tip = {};
  public addTip(event: string, args: any) {
    if (args[0].type === "result") {
      this.tips[event] = {'0':{type: "clear", value: null}}
      return;
    }
    this.tips[event] = {...args};
  }
  public getTips(event: string) {
    return this.tips[event][0];
  }
}
export type tip = {
  [key: string]: any;
};
