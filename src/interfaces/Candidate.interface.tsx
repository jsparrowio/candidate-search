// establish a candidate interface that uses properties that will be fed by GitHub API; uses 1 to 1 naming convention
export default interface Candidate {
    readonly id: number;
    readonly login: string;
    readonly name: string | null;
    readonly avatar_url: string | null;
    readonly html_url: string;
    readonly location: string | null;
    readonly company: string | null;
    readonly email: string | null;
    readonly bio: string | null;
}