import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((filename) => {
        
        const fullPath = path.join(postsDirectory, filename);
        console.log(fullPath);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const id = filename.replace(/\.md$/,'');
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        };
    });
    return allPostsData.sort((a,b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds(){
    /**
    
    you could use ISR (Incremental Static Regeneration) revalidate the props every so often (60 sec ex)

    fetch or ajax call...
    const res = await fetch('...');
    const posts await res.json();
    return posts.map((post)=>{
        params: {
            id: post.id
        },
        revalidate: dataChange ? 10 : false,

        })

     */

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((filename)=> {
        return {
            params: {
                id: filename.replace(/\.md$/,'')
            }

        };
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }

}