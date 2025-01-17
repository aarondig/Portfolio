import { useEffect, useState } from "react";
import "./style.css";
import { a, useSpring, easings, useSprings } from "react-spring";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import { data } from "../../../../data";
import useWindowSize from "../../../../hooks/windowSize";

function Navigation({ location, basename, setIsPopup, navvisible }) {
  const navigate = useNavigate();

  const [active, toggleActive] = useState(false);
  const [menucolor, setMenuColor] = useState("#fff");

  const hamburger = {
    size: 18,
    color: menucolor,
    distance: "sm",
    duration: 0.4,
    // height: "1px",
  };
  // Hamburger menu colors
  useEffect(() => {
    if (active) {
      setMenuColor("#050505");
    }
    if (!active) {
      if (
        location.pathname === `/${basename}/about` ||
        location.pathname === `/${basename}` ||
        location.pathname === `/${basename}/` ||
        location.pathname === `/` ||
        location.pathname === `/${basename}/home`
      ) {
        setMenuColor("#fff");
      } else {
        setMenuColor("#050505");
      }
    }
  }, [active]);

  useEffect(() => {
    if (
      location.pathname === `/${basename}/projects` ||
      location.pathname === `/${basename}/*`
    ) {
      if (!navvisible) {
        setMenuColor("#fff");
      } else if (navvisible) {
        setMenuColor("#050505");
      }
    }
  }, [navvisible]);

  useEffect(() => {
    if (active) {
      setMenuColor("#050505");
    }
    if (!active) {
      if (
        location.pathname === `/${basename}/about` ||
        location.pathname === `/${basename}` ||
        location.pathname === `/${basename}/` ||
        location.pathname === `/` ||
        location.pathname === `/${basename}/home` 
      ) {
        setMenuColor("#fff");
      } else {
        setMenuColor("#050505");
      }
    }
  }, [location.pathname]);

  // //Checking Location Match
  // const [isMatch, setIsMatch] = useState(false);
  // const match = useMatch(`/${basename}/projects/:id`, {
  //   path: location.pathname,
  //   exact: true,
  //   strict: true,
  // });

  // useEffect(() => {
  //   if (match !== null) {
  //     setIsMatch(true);
  //   } else if (match === null) {
  //     setIsMatch(false);
  //   }
  // }, [location]);

  // // const logo = useSpring({
  // //   // opacity: location.pathname !== `/${basename}/` ? 0 : 1,
  // //   opacity: isMatch ? 0 : (navvisible ? 1 : 0),
  // // });

  // const backBtn = useSpring({
  //   // opacity: location.pathname !== `/${basename}/` ? 1 : 0,
  //   opacity: location.pathname === `/${basename}/about` ? 1 : isMatch ? 1 : 0,
  //   color: location.pathname === `/${basename}/about` ? "#252525" : "white",
  // });

  // const Back = () => {
  //   setIsPopup(false);
  //   navigate(-1, { replace: true });
  //   // navigate(`${basename}/projects/`, { replace: true });
  // };

  // NEW

  const [footer, setFooter] = useState();
  const url = location.pathname.split("/");

  const handleNavigate = (e) => {
    //  if (e.target.dataset.id !== "about"){
    //   navigate(`${basename}/projects/${e.target.dataset.id}`, { replace: true })
    //  }
    navigate(`${basename}/${e.target.dataset.id}`, { replace: true });
    window.scrollTo(0, 0);
    toggleActive(false);
  };

//   const projects = data.map((el, i)=>{
//     return `/${basename}/projects/${el.id}`
//     })
// console.log(projects)
  const logoscroll = useSpring({
    opacity: navvisible ? 1 : active ? 1 : 0,
    color: active
      ? "#050505"
      : location.pathname === `/${basename}/about` ||
        location.pathname === `/${basename}` ||
        location.pathname === `/${basename}/` ||
        location.pathname === `/` ||
        location.pathname === `/${basename}/home`
      ? "white"
      : "#050505",
    //     config:

    // { tension: 100,
    //       easing: easings.easeInOutCubic(),
    //     },
  });
  const size = useWindowSize();

  const wrapper = useSpring({
    transform: active ? "translateY(0vh)" :`translateY(-${100}vh)`,
    background: active ? "#fff" : "#050505",
    config: { tension: 100, easing: easings.easeInOutCubic() },
  });

  let pages = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
  ];

  const navsprings = useSprings(
    pages.length,
    pages.map((el, i) =>
      active
        ? {
            from: {
              opacity: 0,
              transform: `translateY(+20px)`,
            },
            to: {
              opacity: 1,
              transform: `translateY(0px)`,
            },

            delay: 180 * (pages.length - 1 - i) + 200,
            // config: { tension: 100, easing: easings.easeOutCubic() },

            onRest: () => setFooter(true),
          }
        : {
            from: {
              transform: `translateY(0px)`,
              opacity: 1,
            },
            to: {
              transform: `translateY(-60px)`,
              opacity: 0,
            },
          }
    )
  );

  useEffect(() => {
    if (!active) {
      setFooter(false);
    }
  }, [active]);
  const parallaxclose = useSpring({
    transform: active ? `translateY(0vh)` : `translateY(100vh)`,
    height: `${size.height}px`,
    config: { tension: 100, easing: easings.easeInOutCubic() },
  });
  const footerspring = useSpring({
    opacity: active ? 1 : 0,
    delay: active ? pages.length * 180 + 200 : 0,
  });


const backbtn = useSpring({opacity: location.pathname === `/${basename}/projects/creditcard` || location.pathname === `/${basename}/projects/make-a-payment` ? (active ? 0 : 1) : 0,
pointerEvents: location.pathname === `/${basename}/projects/creditcard` || location.pathname === `/${basename}/projects/make-a-payment` ? (active ? "none" : "all") : "none"})
  

  let linestroke = "#050505"

  return (
    <div id="navigation">
      <div className="nav-wrap">
      <div className="nav-left">

      <a.div id="back-btn" style={logoscroll}>
        <a.div className="back-btn-inner" style={backbtn} onClick={()=>navigate(`/${basename}/projects`)}>

       
      <svg
                width="67"
                height="66"
                viewBox="0 0 67 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34 21V45"
                  stroke={linestroke}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M43 36L34 45L25 36"
                  stroke={linestroke}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              </a.div>
        </a.div>
      </div>
        <div className="nav-right">
        
        <a.div id="logo" style={logoscroll}>
          aaro
        </a.div>
        <Hamburger toggled={active} toggle={toggleActive} {...hamburger} />
        </div>
      </div>
      <a.div className="nav-active" style={wrapper}>
        <a.div className="nav-inner-wrap" style={parallaxclose}>
          <div className="nav-section">
            {pages.map((el, i) => {
              return (
                <a.div
                  className="nav-link"
                  key={i}
                  onClick={(e) => handleNavigate(e)}
                  style={navsprings[i]}
                >
                  <h6
                    data-id={el.id}
                    data-key={i}
                    className="nav-link-title lg"
                  >
                    {el.id}
                  </h6>
                </a.div>
              );
            })}


          </div>
          <a.div className="nav-footer" style={footerspring}>
            <h6 className="nav-link-title md">aarondiggdon@gmail.com</h6>
          </a.div>
        </a.div>
      </a.div>
    </div>
  );
}

export default Navigation;
