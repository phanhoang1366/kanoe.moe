+++
title = "Happy Birthday to me!"
[taxonomies]
tags = ["birthday", "rant", "ai"]
[extra]
display_published = true
toc = false
+++

Happy birthday to me, happy... nah thôi tôi sẽ vào vấn đề chính.

### Tại sao AI agents khá tệ trong khoản code đối với mình

Đầu tiên, mình không phủ nhận việc là những con AI có thể làm nhiều việc tốt hơn mình, và mình cũng đã có không ít project mà trong đó mình không quan tâm AI code cái gì cả và nó vẫn hoạt động theo cách mà mình mong muốn. Heck, mình còn là một trong những người tiên phong sử dụng LLM trong việc code từ trước khi ChatGPT bắt đầu ra mắt. Lúc đó, nó được gọi là TabNine, và model local của nó chỉ vào khoảng 100MB, dựa trên GPT-2. Không ít project được rao trên Twitter hay Facebook có chủ bảo rằng là không quan tâm code gì, vẫn làm được trăm nghìn đô một tháng. Họ đã lựa chọn đúng điểm đau, đưa AI tự tạo giải pháp, và cuối cùng là chúng ta đã có một cái app "chạy được".

Tuy nhiên, mình nghĩ rằng trừ khi chúng ta có một cái yêu cầu cực kỳ hoàn chỉnh và chi tiết (lúc đó chính chúng ta có thể code thay AI được rồi, chỉ có thể là chậm hơn khá nhiều), thì khoản sáng tạo của mấy con AI sẽ bắt đầu tệ đi - nó sẽ không theo ý muốn của mình một tí nào, và thậm chí còn gây ra nhiều bug và lỗ hổng.

Mình có bắt đầu một cái project cho nhóm. Mình quyết định rằng Django sẽ là một giải pháp nhỏ gọn, phần vì mình đã có một project liên quan đến Django từ trước, phần vì mình thực sự biết mình đang làm cái gì. Trong nhóm cũng không ít người biết dùng Python - đó là yêu cầu của trường gần đây, và bạn cũng thực sự không làm gì được mấy nếu bạn chỉ viết code C/C++ và cố đấm ăn xôi làm Data Science.

Chuyện sẽ không xảy ra khi quyết định của mình được hỏi lại rằng NextJS là một lựa chọn tối ưu hơn - phần vì công ty mà họ thực tập dùng NextJS, phần vì nó có thể giúp họ làm việc nhanh hơn vì nhỡ đâu họ lại có kinh nghiệm nhiều hơn mình. Mình đã đồng ý với điều đó, và mình đã để cho họ tự do lựa chọn framework mà họ muốn. Nhưng sau đó, khi họ bắt đầu code, mình thấy trong codebase của mình có những file này:

```
project/
  - AGENTS.md
  - CLAUDE.md
  - require.md
```

Ôi không.

NextJS không tệ - nó là một trong những framework được sử dụng khá rộng rãi, nên sẽ không bất ngờ nếu như nó được lựa chọn. Nhưng việc để cho một người không quá nổi trội, với hàng chục file Markdown sắp tới để giải thích về cách mà họ muốn code, và sau đó là để cho AI code theo những file đó, thì mình nghĩ rằng đó là một sai lầm lớn. Mình đọc thử file require.md, và nó có những yêu cầu mà, nếu như nó là một cái sheet PDF và chính POT viết rõ ràng hơn một tí, thì chắc chắn mình, thậm chí là AI cũng có thể hiểu được. Vấn đề là gì? Các yêu cầu được viết khá chung chung, và mình thấy nó giống kiểu snake oil để nổ cái context window của AI hơn là một cái yêu cầu thực sự có thể giúp cho AI code đúng theo ý mình.

Mình cũng đã thử vibe code với cái project Bad Apple!! trên STM32 của mình. Nhìn qua thì nó có vẻ khá ổn, nhưng vấn đề xảy ra khi mình đang cố hiểu cái code mà AI đã viết ra. Đúng là nó hoạt động, nhưng nó được viết theo một cách mà, nếu như mình viết, thì nó sẽ đỡ mất headroom hơn, mặc dù nó cũng khá to. Mình có thể hiểu cái code đó, nhưng, hoặc nó không tối ưu (họ chọn polling thay vì đưa ra yêu cầu mình config ngắt), hoặc nó implement khá xấu. Lúc đó, trừ khi vấn đề nan giải đến mức mà mình thấy rằng, à, cần phải gọi AI để tìm thử xem nó bị lỗi như thế nào, thì mình nghĩ rằng việc để cho AI code theo một cái yêu cầu chung chung như vậy sẽ không giúp được gì nhiều.

### Chúng ta cần một khoảng thời gian không dùng AI

Trong khoảng thời đại mà AI đang phát triển, mình nghĩ rằng các bạn, chính các bạn, nên thử snooze con AI một ít thời gian, và so sánh trình độ của mình hiện tại so với trình độ mà trước khi LLM bắt đầu trở nên phổ biến. Mình đã thử, kết quả khá sốc khi mình nhận ra rằng, mình đang nhìn vào màn hình chỉ có chữ `import` hay `def` được khá lâu rồi, tay mình đang trỏ vào nút tab, nhưng không có gì để tab cả, mình phải tự dựa vào mình. Mình vẫn code được, nhưng nó khá chậm, và mình đã quên khá nhiều thứ mà trước đây mình biết. Mình đã phải tra lại khá nhiều thứ, và mình nhận ra rằng, à, mình đã quá phụ thuộc vào AI rồi.

Tự nhiên lại nhớ đến cái một thời mà Stack Overflow còn phổ biến, lúc đó mình cũng còn dựa vào nó khá nhiều. Đương nhiên là nó sẽ không bao giờ sẽ y hệt như vấn đề hay code của mình, đó là điều mình cần phải tự hiểu và tự giải quyết. Khi AI ra đời, traffic của Stack Overflow đã giảm đi khá nhiều, đó là do AI đã trở nên phổ biến hơn, dễ đặt câu hỏi và dễ cho ra câu trả lời hơn. Tuy nhiên, đối với mình, nó vẫn có chỗ đứng, khi có những cái mà trong training data của AI có ít, hay những cái mà mới nổi, thì Stack Overflow vẫn là một nguồn tham khảo khá tốt. Giá như chúng ta có thể quay về thời điểm đó, khi mà chúng ta vẫn phải tự mình tìm hiểu và giải quyết vấn đề, thì có lẽ chúng ta sẽ có một trình độ code tốt hơn nhiều so với bây giờ.

Thôi rant đã xong, giờ mình sẽ bật 12 session Claude Code lên, kèm với 4 con OpenClaw để cào web và vibe code tiếp thôi. Chúc mọi người một ngày tốt lành!