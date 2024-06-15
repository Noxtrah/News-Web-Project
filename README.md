Video Link:
https://drive.google.com/file/d/120V2Jf1965VRLTQXZGuF0l0pDfg3VpYm/view?usp=sharing

Backend Deployment Link:
https://msn-api-web-project.onrender.com

Frontend Deployment Link:
https://news-web-project.vercel.app


Notes:
-After clicking on a news, you will be directed to the news detail page. Changing the language you make here will not change the content of the news in detail page.
Because I'm not making a new fetch call on that page.
-I may not have translated some words I missed.
-After like or dislike a news, if users refresh the page they can't see their like or dislike until go back to dashboard and enter to the same news detail page.
This is because I don't make a news fetch call in detailPages, I just use the data from the url which is filled in the dashboard. When users liked/disliked without refreshing
the page they can see changes because of I increase it in client-side temporarily. The reason why the news fetch calls is not used on detail pages is to reduce the number of requests and db usage. (I use paid db)
-Users might see an error flag at the bottom left when switched the language to the turkish. It is becuase pre-render ability of react. Some html element rendered in english
initially and doesn't match when switched to turkish. This error doesn't affect the user experience. For now I haven't found a way to hide/fix the error




Brief Description:
1-) There are two type of sign-in. Local sign-in or Google sign-in.
    - For local, I used bcrypt to hash passwords before storing in db. If login is sucessful, JWT will be generated and given to the user.
    - For google, I used Gooogle-OAuth2 by Passport.js. If sign-in is successful, info come from Google stored in the url and used in necessary pages.

2-) In the header there is a cog-icon next to profile-icon. If clicked, you will see two language options.
    -Changing language will change the text in the code. (I might have forgotten to translate some words)
    -Changing language will change the target table in some functions.(News or NewsTR).

3-) At the rightmost of header there is a notification-icon. It will display top 5 latest news. The latest news data will come from a websocket server. Thus, when a new news is uploaded, the user can see it at any time. Clicking on it will take you to the news detail page.

4-) In the middle of header there is a searchbar. User can type anything. If search with a empty input user will still directed to the new tab, probably see nothing. (If a record with empty title or description is found, it can be displayed. I don't have a record with empty title or description for now.)

5-) Under the header there is a navbar. You can see categories at here. Selecting a category will call a fetch to change the content.

6-) In news detail page user can like/dislike news. The likes will stored in a table named contentInteractions. I am using this table for recommendation system.

7-) In news detail page users can see recommended news for them. It is not a item-based recommend, it is user-based. For example if userA liked some news about technology, in the recommendations section, user will see a list of news about technology. If a user didn't liked any news, they will see top ten most liked news in the recommendations section.

8-) Every Page is responsive.

9-) This project has two repositories in GitHub. One for client-side and one for server-side. This project is client-side.

10-) In backend I used Node.js and Express.js as framwork. I used MSSQL as database. And some libraries about passport.js, bcrypt, websocket, and so on.

11-) In frontend I used JavaScript, TypeScript, CSS. As libraries I used React.js, TailwindCSS, i18next, and so on. As framework I used Next.js.

12-) I have four database tables. Users, News, NewsTR and ContentInteractions.
