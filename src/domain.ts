


export interface Question {
    question: string;
    answer: number;
    isImportant: boolean;
    class: QuestionClass;
    className: string;
    isChange: boolean;
    resultClass: string;
}

export interface Questions{
    manager: Array<Question>;
    employer: Array<Question>;
}

export enum QuestionClass {
    wellness,
    jobtasks,
    development,
    community,
    leadership
}

export enum PageEnum{
    homepage,
    basicInfo,
    wellness,
    jobtasks,
    development,
    community,
    leadership,
    results
}

export enum RoleEnum{
    manager,
    employer
}
