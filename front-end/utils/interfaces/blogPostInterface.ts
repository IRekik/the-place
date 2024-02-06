export interface BlogPost {
    blog_id: number;
    title: string;
    content: string;
    creation_date: string;
    edit_date?: string | null;
    img_reference?: string;
}