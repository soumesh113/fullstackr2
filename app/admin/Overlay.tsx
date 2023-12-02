import { useState } from 'react';
import { useRouter } from 'next/navigation';
type Props = {
    onClose: any,
    editt : any,
    post: Blog
}
const Overlay = ({onClose, editt, post}:Props) => {
  const [formData, setFormData] = useState({
        title: post.title, author: post.author_name, text: post.blog_text
  });

  async function handleSubmit(e:any){
    e.preventDefault();
    if(formData.title==post.title && formData.author==post.author_name && formData.text==post.blog_text)
    {
       alert("No changes detected")
       onClose();
    }
    else
    {
    alert("Blog edited")
    const wait = await editt(post.blog_id, formData.title, formData.author, formData.text);
    onClose(); 
    }
  };

  function cancel(){
      onClose()
  }
const cols = 84
const rows = 6
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Blog: </h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">Title:</label>
        <input
              type="text"
              value={formData.title}
              name = "title"
              id = "title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              required
            /> 
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="author">Author:</label>
        <input
              type="text"
              value={formData.author}
              name = "author"
              id = "author"
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Author"
              required
            />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="content">Content:</label>
        <textarea
              value={formData.text}
              name = "text"
              id = "content"
              rows={rows}
              cols = {cols}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Text"
              required
            />
      </div>
      <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
          <button onClick={cancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Overlay;
