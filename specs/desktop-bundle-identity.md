# Desktop bundle identity

桌面安装包身份由 `packages/desktop/scripts/desktop-product-identity.mjs` 统一定义：正式版使用 `dev.qiyicode.app`，Preview 使用 `dev.qiyicode.app.preview`。electron-builder 与 Windows AppUserModelId 继续读取同一来源；开发态 macOS bundle 使用 `dev.qiyicode.app.development`。

本次只变更应用 bundle ID，不迁移用户数据、不修改 URL scheme 或独立 Finder workflow 的身份。重新打包后，安装到 `/Applications/qiyicode.app` 的 `CFBundleIdentifier` 必须为 `dev.qiyicode.app`，Electron Helper 使用该 ID 的派生标识，应用能够启动。构建或产物检查失败时不覆盖现有安装。
