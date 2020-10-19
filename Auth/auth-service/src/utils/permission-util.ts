// Converting them to hashmaps and then compare might be a faster solution.
// Use more RAM and less CPU.
export const hasPermissions = (
    current: Array<string>,
    compare: string | Array<string>
): boolean => {
    if (Array.isArray(compare)) {
        for (const comparePerm of compare) {
            let found = false;
            for (const currPerm of current) {
                if (currPerm === comparePerm) {
                    found = true;
                    break;
                }
            }

            if (!found) return false;
        }

        return true;
    }

    for (const currPerm of current) {
        if (currPerm === compare) {
            return true;
        }
    }

    return false;
};
