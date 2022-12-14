<template>
  <div>
    <header>
        <h1>Earth Observatory</h1>
    </header>
    <section class="container">
        <section class="itemLeft">
            <ItemPage>
                <ItemOne/>
            </ItemPage>
            <ItemPage>
                <ItemTwo/>
            </ItemPage>
        </section>
        <section class="itemCenter">
            <MapPage/>
        </section>
        <section class="itemRight">
            <ItemPage>
                <ItemThree/>
            </ItemPage>
            <ItemPage>
                <ItemFour/>
            </ItemPage>
        </section>
    </section>
  </div>
</template>

<script>
import ItemPage from "@/components/ItemPage.vue"
import ItemOne from "@/components/ItemOne.vue"
import ItemTwo from "@/components/ItemTwo.vue"
import ItemThree from "@/components/ItemThree.vue"
import ItemFour from "@/components/ItemFour.vue"
import MapPage from "@/components/MapPage.vue"
export default {
    components: {
        ItemPage,
        ItemOne,
        ItemTwo,
        ItemThree,
        ItemFour,
        MapPage
    }
}
</script>

<style lang="less">
    header {
        height: 2rem;
        width: 100%;
        background-color: rgba(88, 88, 97, 0.2);
        h1 {
            font-size: 1rem;
            color: #fff;
            text-align: center;
            line-height: 2rem;
        }
    }
    .container {
        // 最大最小宽度
        min-width: 1200px;
        max-width: 2048px;
        margin: 0 auto;
        border-top: 4px solid rgb(235, 235, 235);
        padding: .5rem .5rem 0;
        // 设置flex布局
        display: flex;
        .itemLeft, .itemRight { 
            flex: 4;
        }
        .itemCenter {
            flex: 4;
            height: 10.5rpx;
            border: 1px solid rgb(255, 255, 255);
            padding: 0.125rem;
            margin: .25rem;
        }
    }
</style>