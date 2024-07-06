namespace quizgame.top.API.Controllers
{
    /// <summary>
    /// Singleton class for storing data in memory
    /// </summary>
    public class Data
    {
        private static Data? instance;

        private Data() {}

        public int Count { get; set; } = 0;

        public static Data Instance
        {
            get
            {
                if (instance == null) instance = new Data();
                return instance;
            }
        }
    }
}
