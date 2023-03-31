import HttpService from "./http-service";

class PostService {
  constructor() {
    this.httpService = new HttpService();
  }

  async getPosts() {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/post`
    );
  }

  async createPost(postCreateDto) {
    return await this.httpService.request(
      "POST",
      `${process.env.REACT_APP_API_URL}/api/v1/post/create`,
      { body: postCreateDto }
    );
  }

  async getPostById(postId) {
    return await this.httpService.request(
      "GET",
      `${process.env.REACT_APP_API_URL}/api/v1/post/${postId}`
    );
  }

  async updatePostById(postUpdateDto, postId) {
    return await this.httpService.request(
      "PUT",
      `${process.env.REACT_APP_API_URL}/api/v1/post/update/${postId}`,
      { body: postUpdateDto }
    );
  }

  async deletePostById(postId) {
    return await this.httpService.request(
      "DELETE",
      `${process.env.REACT_APP_API_URL}/api/v1/post/delete/${postId}`
    );
  }
}

export default PostService;
