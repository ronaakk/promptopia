import PromptCard from "./PromptCard"

function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="prompt_layout mt-15">
        {data.map((post) => (
            <PromptCard 
              key={post._id}
              post={post}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleEdit={() => handleEdit && handleEdit(post)}
            />
        ))}
      </div>
    </section>
  )
}

export default Profile