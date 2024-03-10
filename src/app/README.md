# Architecture concerns

## App

Into **Feature Sliced Design** "app" folder means **Pages Layer** Layer wich for NextJs's App Router concept it means routes, whether api or pages.

Each route (eg. api, profile, boards) stands for an **Slice** wich do not communicate or depend to each other. They are divided based on business logic. Each of them has their own **Segments** divided by their thecnical purposes (eg. page, layout, actions)


# Draft
📂 pages/
  📁 feed/
  📁 sign-in/
  📁 article-read/
  📁 article-edit/
  📁 profile/
  📁 settings/
