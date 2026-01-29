type LecturerContacts = {
    email: string;
    phone?: string;
};

enum GroupStatus {
    Open = 'open',
    InProgress = 'in progress',
    Closed = 'closed',
}

enum VisitStatus {
    Present = 'present',
    Absent = 'absent',
}

class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    private _areas: Area[] = [];
    private _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(area: Area): void {
        this._areas.push(area);
    }

    removeArea(areaName: string): void {
        this._areas = this._areas.filter(a => a.name !== areaName);
    }

    addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(fullName: string): void {
        this._lecturers = this._lecturers.filter(
            l => `${l.lastName} ${l.firstName}` !== fullName
        );
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    private _levels: Level[] = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get levels(): Level[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }

    addLevel(level: Level): void {
        this._levels.push(level);
    }

    removeLevel(levelName: string): void {
        this._levels = this._levels.filter(l => l.name !== levelName);
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    private _groups: Group[] = [];
    private _name: string;
    private _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups(): Group[] {
        return this._groups;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    addGroup(group: Group): void {
        this._groups.push(group);
    }

    removeGroup(directionName: string): void {
        this._groups = this._groups.filter(g => g.directionName !== directionName);
    }
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    private _status: GroupStatus = GroupStatus.Open;
    private _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
    private _directionName: string;
    private _levelName: string;

    constructor(directionName: string, levelName: string) {
        this._directionName = directionName;
        this._levelName = levelName;
    }

    showPerformance(): Student[] {
        return [...this._students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    }

    get status(): GroupStatus {
        return this._status;
    }

    get students(): Student[] {
        return this._students;
    }

    get directionName(): string {
        return this._directionName;
    }

    get levelName(): string {
        return this._levelName;
    }

    addStudent(student: Student): void {
        this._students.push(student);
    }

    removeStudent(fullName: string): void {
        this._students = this._students.filter(s => s.fullName !== fullName);
    }

    setStatus(status: GroupStatus): void {
        this._status = status;
    }

}

class Student {
    // implement 'set grade' and 'set visit' methods

    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;
    private _grades: Record<string, number> = {}; // workName: mark
    private _visits: VisitStatus[] = []; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }

    setVisit(status: VisitStatus): void {
        this._visits.push(status);
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage: number = (this._visits.filter(v => v === VisitStatus.Present).length / (this._visits.length || 1)) * 100;
        return (averageGrade + attendancePercentage) / 2;
    }
}

class Lecturer {
    constructor(
        public firstName: string,
        public lastName: string,
        public position: string,
        public company: string,
        public experience: number,
        public courses: string[],
        public contacts: LecturerContacts
    ) {
    }
}
