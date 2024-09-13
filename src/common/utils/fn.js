export function isEmpty(obj) {
    // 0, false, null, undefined, NaN, '', [], {} 返回false
    if (!obj) {
        return true;
    }

    if (Array.isArray(obj) && obj.length === 0)  {
        return true;
    }

    if (typeof obj === 'object' && Object.keys(obj).length === 0) {
        return true;
    }

    if (obj instanceof Map && obj.size === 0) {
        return true;
    }

    if (obj instanceof Set && obj.size === 0) {
        return true;
    }

    return false;
}