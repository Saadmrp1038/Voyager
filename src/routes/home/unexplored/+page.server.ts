
export const load = async ({ locals: { supabase }, params, fetch }) => {

    async function getBlogData(){
        const ret = await fetch('/api/unexplored/get-all', {
            method: 'POST',
            body: JSON.stringify({})
        });
        const res = await ret.json()
        return res
    }

    return { 
        allBlogs: getBlogData()
    };

}