import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from './common/Footer';
import auth from '../config/firebase';

function Blogs() {

    const [blogs, setBlogs] = useState([]);
    const [admin, setAdmin] = useState([false])

    //when page refresh happen and as soon as page mounted at that second database data will be take and proceed here,that reason use useEffect 
    useEffect(() => {
        window.scrollTo(0, 0);

        //if user was logged in
        auth.onAuthStateChanged((user) => {//when Authentication state was changed
            if (user) {
                //console.log(user.uid)//all user have uid
                if (user.uid === "jS4qw7KW2nUvUu263A6qwAfwYHv2") {
                    setAdmin(true)//if Admin was logged in the page, blog section will able to work
                    // console.log("He is Admin")
                } else {
                    setAdmin(false)//if other user was logged in mean blog section not able to work
                    // console.log("Not a Admin")
                }
            } else {
                console.log("User Logged Out")
            }
        })

        axios.get("http://localhost:5000/api/blogs").then((res) => {
            console.log(res.data)
            setBlogs(res.data)
        }).catch(() => {
            console.log("Error fetching data")
        })


    }, [])



    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');


    const handleLike = async (blog_id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`);
            // After successfully updating the likes count in the backend, fetch the updated list of blogs
            if (response.status === 200) {
                axios.get("http://localhost:5000/api/blogs").then((res) => {
                    console.log(res.data)
                    setBlogs(res.data)//after every click of likes data will be updated in setBlogs and that likes increament will be visible in that screen
                }).catch(() => {
                    console.log("Error fetching data")
                })
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };
    //new blog create
    const handleNewBlogSubmit = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


        const likes = 0
        axios.post("http://localhost:5000/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
            console.log(res.data)

            axios.get("http://localhost:5000/api/blogs").then((res) => {
                console.log(res.data)
                setBlogs(res.data)
            }).catch(() => {
                console.log("Error fetching data")
            })

        });




        setNewTitle('');
        setNewContent('');
    };

    return (
        <div className="blog-section py-14">
            <h2 className="text-center text-5xl font-bold mb-14">Latest  <span className='text-orange-400'>Blogs</span> 📚</h2>

            {/* Blog creation form */}

            {//admin true means create blog 
                admin ? <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                    <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Blog Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="p-2 border rounded"
                            required
                        />
                        <textarea
                            placeholder="Blog Content"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="p-2 border rounded"
                            rows="4"
                            required
                        />
                        <button type="submit" className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600">
                            Add Blog
                        </button>
                    </form>
                </div>
                    : ""//admin false not able create blog but you able to see admin blog post
            }


            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
                        <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
                        <span className="text-blue-500 cursor-pointer" onClick={() => handleLike(blog._id)}>Like</span>
                        <span className="ml-2">{blog.likes} Likes</span>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Blogs