export const getData = (userData) => {
    const formatNumber = (num) => {
        return Number(num).toLocaleString()
      }
    
      let images = [],
        output = [],
        like_c,
        comments_c,
        engagement_rate,
        engagement_rate_sum = 0,
        engagement_rate_avg = 0,
        followers = 0

    if (userData) {
      if (
        userData.user.blocked_by_viewer === false &&
        userData.user.edge_owner_to_timeline_media["count"] > 0
      ) {
        followers = userData.user.edge_followed_by["count"]
        let edges = userData.user.edge_owner_to_timeline_media["edges"]
        for (let p in edges) {
          if (edges.hasOwnProperty(p)) {
            like_c = edges[p].node.edge_liked_by["count"]
            comments_c = edges[p].node.edge_media_to_comment["count"]
            engagement_rate = ((like_c + comments_c) / followers) * 100
            engagement_rate_sum += engagement_rate
            engagement_rate = Number(engagement_rate.toFixed(2))
            images.push({
              type: edges[p].node.__typename,
              caption:
                edges[p]["node"]["edge_media_to_caption"]["edges"].length > 0
                  ? edges[p].node.edge_media_to_caption["edges"][0].node.text
                  : "",
              engagement_rate: engagement_rate,
              like: like_c,
              comments: comments_c,
              link:
                "https://www.instagram.com/p/" + edges[p]["node"]["shortcode"],
              thumbnail: edges[p]["node"]["thumbnail_resources"][1]["src"],
            })
          }
        }
        if (images.length > 0) {
          engagement_rate_avg = Number(
            engagement_rate_sum / images.length.toFixed(2)
          )
        }
      }
      output = {
        full_name: userData.user.full_name,
        username: userData.user.username,
        link: "https://www.instagram.com/" + userData.user.username,
        biography: userData.user.biography,
        followers: formatNumber(followers),
        can_see: !(
          (userData.user.is_private &&
            userData.user.followed_by_viewer === false) ||
          userData.user.blocked_by_viewer
        ),
        engagement_rate_avg: engagement_rate_avg.toFixed(2),
        images: images,
      }
      return output
    }
  }