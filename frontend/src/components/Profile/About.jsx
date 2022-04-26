import { useSelector } from "react-redux";
import {
  AiOutlineMail,
  AiOutlineGithub,
  AiOutlineLink,
  AiFillTwitterCircle,
} from "react-icons/ai";
import parse from 'html-react-parser';

const SectionBlank = ({ section, setEditProfile }) => {
  return (
    <div className="h-32 border border-gray-300 bg-gray-100 rounded-md flex justify-center items-center text-center p-10">
      <p className="text-sm mx-auto max-w-xs text-gray-600">
        Your {section} section is currently blank. Would you like to add one?{" "}
        <button onClick={() => setEditProfile(true)} className="text-blue-500 hover:text-blue-400 duration-200">
          Edit profile
        </button>
        {/* <a href="#" className="text-blue-500 hover:text-blue-400 duration-200">
          Edit profile
        </a> */}
      </p>
    </div>
  );
};

const AboutMe = ({ editProfile}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex flex-col min-w-full">
        <div id="about-me-title" className="mb-2">
          <h2 id="edit-profile-subcontent" className="text-3xl">
            About me
          </h2>
          <div className="py-2 block">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        <div className="">
          {user.aboutMe ? (
            <>
              <div>{parse(user.aboutMe)}</div>
              <div className="py-5 block">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </>
          ) : (
            <>
              <SectionBlank section="about me" setEditProfile={editProfile}/>
              <div className="py-5 block">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Email</h3>

          {user.email ? (
            <div className="flex flex-row justify-start items-center py-1">
              <AiOutlineMail size={20} className="m-1 mr-3" />{" "}
              <p className="text-blue-700 hover:underline">
                <a href={`mailto:${user.email}`}> {user.email}</a>
              </p>
            </div>
          ) : (
            <SectionBlank section="email" setEditProfile={editProfile}/>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Website</h3>
          {user.website ? (
            <div className="flex flex-row justify-start items-center py-1">
              <AiOutlineLink size={20} className="m-1 mr-3" />
              <p className="text-blue-700 hover:underline">
                <a href={`${user.website}`}> {user.website}</a>
              </p>
            </div>
          ) : (
            <SectionBlank section="website" setEditProfile={editProfile}/>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Twitter</h3>
          {user.twitter ? (
            <div className="flex flex-row justify-start items-center py-1">
              <AiFillTwitterCircle size={20} className="m-1 mr-3" />
              <p className="text-blue-700 hover:underline">
                <a href={`${user.twitter}`}> {user.twitter}</a>
              </p>
            </div>
          ) : (
            <SectionBlank section="twitter" setEditProfile={editProfile}/>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">GitHub</h3>
          {user.github ? (
            <div className="flex flex-row justify-start items-center py-1">
              <AiOutlineGithub size={20} className="m-1 mr-3" />
              <p className="text-blue-700 hover:underline">
                <a href={`${user.github}`}> {user.github}</a>
              </p>
            </div>
          ) : (
            <SectionBlank section="github" setEditProfile={editProfile}/>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutMe;
