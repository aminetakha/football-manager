export default async (url: string) => {
    const response = await fetch(url, {
        credentials: 'include'
    });

    if(!response.ok){
        throw new Error('an error occurred');
    }
    
    const data = await response.json();
    return data;
}