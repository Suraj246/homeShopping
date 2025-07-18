import Products from "./Products"
function Home({ input }) {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Products input={input} />
        </div>
    )
}

export default Home
