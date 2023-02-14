export class DepartmentWithProductCount {
    departmentName: string
    count: number

    constructor(depName: string, count: number) {
        this.departmentName = depName
        this.count = count
    }
}