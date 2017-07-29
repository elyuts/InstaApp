export class Project {
    id: string;
    title: string;
    description: string;
    fundNeeded: number;
    fundGathered: number;
    recomendedPayment: number;
    state: ProjectState;
    isImplemented: boolean;
    isPrivate: boolean;

    constructor() {
        this.fundNeeded = 0;
        this.fundGathered = 0;
        this.recomendedPayment = 0;
        this.state = ProjectState.Edit;
    }
}

export enum ProjectState {
    Edit = 0,
    New = 1,
    Active = 2,
    Finished = 3
}