// 进程名统一使用 qiyicode 品牌前缀（产品要求：ps / 活动监视器中不出现旧名）；
// 此常量是唯一来源，进程角色识别（如稳定性遥测的 host/agent 判断）也必须引用它。
export const QIYICODE_PROCESS_NAME_PREFIX = "qiyicode";
const MAX_PROCESS_NAME_SEGMENT_LENGTH = 24;

function sanitizeProcessNameSegment(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, MAX_PROCESS_NAME_SEGMENT_LENGTH);
}

function joinQiyicodeProcessName(...segments: Array<string | null | undefined>): string {
  const sanitizedSegments = segments
    .map((segment) => sanitizeProcessNameSegment(segment))
    .filter((segment): segment is string => Boolean(segment));
  return [QIYICODE_PROCESS_NAME_PREFIX, ...sanitizedSegments].join("-");
}

function pickWorkspaceTag(workspacePath: string | null | undefined): string | undefined {
  const trimmedPath = workspacePath?.trim();
  if (!trimmedPath) {
    return undefined;
  }

  const parts = trimmedPath.split(/[\\/]+/).filter(Boolean);
  return parts.at(-1) ?? trimmedPath;
}

export function formatQiyicodeMainProcessName(): string {
  return joinQiyicodeProcessName("main");
}

export function formatQiyicodeGpuProcessName(): string {
  return joinQiyicodeProcessName("gpu");
}

export function formatQiyicodeHostProcessName(label?: string): string {
  return joinQiyicodeProcessName("host", label);
}

export function formatQiyicodeRendererProcessName(windowTitle?: string): string {
  const normalizedTitle = windowTitle?.trim();
  if (!normalizedTitle || normalizedTitle === "ZCode") {
    return joinQiyicodeProcessName("renderer", "main");
  }

  if (normalizedTitle === "Resource Manager") {
    return joinQiyicodeProcessName("renderer", "resource-manager");
  }

  const remoteWindowPrefix = "ZCode - ";
  if (normalizedTitle.startsWith(remoteWindowPrefix)) {
    return joinQiyicodeProcessName(
      "renderer",
      "remote",
      normalizedTitle.slice(remoteWindowPrefix.length),
    );
  }

  return joinQiyicodeProcessName("renderer", normalizedTitle);
}

export function formatQiyicodeAgentProcessName(provider: string, workspacePath?: string): string {
  return joinQiyicodeProcessName("agent", provider, pickWorkspaceTag(workspacePath));
}

export function formatQiyicodeUtilityProcessName(name?: string, type = "utility"): string {
  return joinQiyicodeProcessName(type, name);
}
