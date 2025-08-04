/**
 * 增强版 extend 函数
 * @param {Boolean} deep 是否深拷贝
 * @param {Object} target 目标对象
 * @param {...Object} sources 源对象
 * @return {Object} 合并后的目标对象
 */
export function extend(deep: boolean | object, target?: object, ...sources: object[]): object {
  // 处理参数
  if (typeof deep !== "boolean") {
    sources.unshift(target as object);
    target = deep;
    deep = false;
  }

  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  // 用于检测循环引用的 WeakMap
  const seen = new WeakMap<object, object>();

  const extendInternal = (to: object, from: object): object => {
    for (const key in from) {
      if (!Object.prototype.hasOwnProperty.call(from, key)) continue;

      const srcVal = (from as Record<string, unknown>)[key];
      const toVal = (to as Record<string, unknown>)[key];

      // 处理特殊对象
      if (deep && srcVal && typeof srcVal === "object") {
        // 检测循环引用
        if (seen.has(srcVal as object)) {
          (to as Record<string, unknown>)[key] = seen.get(srcVal as object)!;
          continue;
        }

        // 处理特殊对象类型
        if (srcVal instanceof Date) {
          (to as Record<string, unknown>)[key] = new Date(srcVal);
          continue;
        }

        if (srcVal instanceof RegExp) {
          (to as Record<string, unknown>)[key] = new RegExp(srcVal);
          continue;
        }

        if (srcVal instanceof Map) {
          (to as Record<string, unknown>)[key] = new Map(srcVal);
          continue;
        }

        if (srcVal instanceof Set) {
          (to as Record<string, unknown>)[key] = new Set(srcVal);
          continue;
        }

        // 处理普通对象和数组
        let clone: object;
        if (Array.isArray(srcVal)) {
          clone = toVal && Array.isArray(toVal) ? toVal : [];
        } else {
          clone = toVal && typeof toVal === "object" ? toVal : {};
        }

        // 记录已处理对象，用于检测循环引用
        seen.set(srcVal as object, clone);

        (to as Record<string, unknown>)[key] = extendInternal(clone, srcVal as object);
      } else if (srcVal !== undefined) {
        (to as Record<string, unknown>)[key] = srcVal;
      }
    }
    return to;
  };

  const to = Object(target);

  for (const source of sources) {
    if (source == null) continue;
    extendInternal(to, source);
  }

  return to;
}
