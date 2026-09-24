// 命令名（zcode）是用户接口保持不变；进程标题统一携带 qiyicode 品牌前缀，避免系统进程列表出现旧名。
export const CLI_COMMAND_NAME = "zcode";
export const CLI_PROCESS_NAME = "qiyicode-cli";

interface ProcessTitleTarget {
  title: string;
}

export const setCliProcessTitle = (
  target: ProcessTitleTarget = process,
): void => {
  target.title = CLI_PROCESS_NAME;
};
