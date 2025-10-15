import React from "react";

import PopularProduct from "./pages/popularproduct/page";

import Banner from "./pages/banner/page";

import Categories from "./pages/categories/page";

// Static generation improves TTFB and enables bfcache in production
export const dynamic = "force-static";
export const revalidate = 3600;

const Home = () => {
  // const heading = headings;

  // const filteredProducts = products.filter(
  //   (product) => product.category === heading.title
  // );

  return (
    <div
      className="max-w-[1640px] mx-auto xl:px-[143px] px-2 pt-[55px]"
      data-testid="home-container"
    >
      <Categories />
      <PopularProduct />
      {/* <DailySells />
      <DealsDay />
      <Products /> */}
      <Banner />
      {/* <Advertise /> */}
    </div>
  );
};

export default Home;

{
  /*const App = () => {
  return (
    <>
      <Root>
        <Routes>
          {routes.map(
            ({ path, component: Component, isProtected, useLayout }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute>
                      {useLayout ? (
                        // <Layout>
                        <Component />
                      ) : (
                        // </Layout>
                        <Component />
                      )}
                    </ProtectedRoute>
                  ) : (
                    <PublicRoute>
                      {useLayout ? (
                        // <Layout>
                        <Component />
                      ) : (
                        // </Layout>
                        <Component />
                      )}
                    </PublicRoute>
                  )
                }
              />
            )
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Root>
    </>
  );
}; */
}
